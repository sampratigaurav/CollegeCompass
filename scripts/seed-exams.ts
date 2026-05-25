import { config } from 'dotenv';
config({ path: '.env.local' });

import { ExamEventType, SourceType } from '@prisma/client';
import { EXAMS_REGISTRY } from '../src/lib/exams/registry';
import { prisma } from '../src/lib/db';

const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;

const baselineEvents: Record<string, any[]> = {
  "jee-main": [
    { type: ExamEventType.REGISTRATION, title: "Session 1 Registration", startDate: new Date(`${currentYear}-11-01`), endDate: new Date(`${currentYear}-12-04`), is_tentative: true },
    { type: ExamEventType.EXAM, title: "Session 1 Exam", startDate: new Date(`${nextYear}-01-24`), endDate: new Date(`${nextYear}-02-01`), is_tentative: true },
    { type: ExamEventType.REGISTRATION, title: "Session 2 Registration", startDate: new Date(`${nextYear}-02-02`), endDate: new Date(`${nextYear}-03-02`), is_tentative: true },
    { type: ExamEventType.EXAM, title: "Session 2 Exam", startDate: new Date(`${nextYear}-04-04`), endDate: new Date(`${nextYear}-04-15`), is_tentative: true },
    { type: ExamEventType.COUNSELLING, title: "JoSAA Counselling", startDate: new Date(`${nextYear}-06-10`), is_tentative: true }
  ],
  "neet": [
    { type: ExamEventType.REGISTRATION, title: "Online Registration", startDate: new Date(`${nextYear}-02-09`), endDate: new Date(`${nextYear}-03-16`), is_tentative: true },
    { type: ExamEventType.EXAM, title: "NEET UG Exam", startDate: new Date(`${nextYear}-05-05`), is_tentative: true },
    { type: ExamEventType.RESULT, title: "Result Declaration", startDate: new Date(`${nextYear}-06-14`), is_tentative: true }
  ],
  "bitsat": [
    { type: ExamEventType.REGISTRATION, title: "Session 1 Registration", startDate: new Date(`${nextYear}-01-15`), endDate: new Date(`${nextYear}-04-11`), is_tentative: true },
    { type: ExamEventType.EXAM, title: "Session 1 Exam", startDate: new Date(`${nextYear}-05-19`), endDate: new Date(`${nextYear}-05-24`), is_tentative: true },
    { type: ExamEventType.REGISTRATION, title: "Session 2 Registration", startDate: new Date(`${nextYear}-05-22`), endDate: new Date(`${nextYear}-06-10`), is_tentative: true },
    { type: ExamEventType.EXAM, title: "Session 2 Exam", startDate: new Date(`${nextYear}-06-22`), endDate: new Date(`${nextYear}-06-26`), is_tentative: true }
  ],
  "kcet": [
    { type: ExamEventType.REGISTRATION, title: "Registration", startDate: new Date(`${nextYear}-01-10`), endDate: new Date(`${nextYear}-02-20`), is_tentative: true },
    { type: ExamEventType.EXAM, title: "KCET Exam", startDate: new Date(`${nextYear}-04-18`), endDate: new Date(`${nextYear}-04-19`), is_tentative: true }
  ],
  "cuet-ug": [
    { type: ExamEventType.REGISTRATION, title: "Online Registration", startDate: new Date(`${nextYear}-02-27`), endDate: new Date(`${nextYear}-03-26`), is_tentative: true },
    { type: ExamEventType.EXAM, title: "CUET UG Exam", startDate: new Date(`${nextYear}-05-15`), endDate: new Date(`${nextYear}-05-31`), is_tentative: true }
  ]
};

async function main() {
  console.log("Starting Exam Seeding & Linking...");

  // 1. Create or Update Exams
  for (const registryEntry of EXAMS_REGISTRY) {
    const exam = await prisma.exam.upsert({
      where: { slug: registryEntry.id },
      update: {
        name: registryEntry.name,
        authority: registryEntry.authority,
        official_website: registryEntry.officialSite,
        notices_url: registryEntry.noticesPage,
      },
      create: {
        slug: registryEntry.id,
        name: registryEntry.name,
        authority: registryEntry.authority,
        official_website: registryEntry.officialSite,
        notices_url: registryEntry.noticesPage,
        parser_version: "v1.0",
        parser_health: "HEALTHY",
      }
    });

    console.log(`Upserted Exam: ${exam.name}`);

    // 2. Populate Baseline Events
    const events = baselineEvents[exam.slug] || [];
    if (events.length > 0) {
      await prisma.examEvent.deleteMany({ where: { examId: exam.id } }); // Clear existing
      
      for (const ev of events) {
        await prisma.examEvent.create({
          data: {
            examId: exam.id,
            type: ev.type,
            title: ev.title,
            startDate: ev.startDate,
            endDate: ev.endDate || null,
            is_tentative: ev.is_tentative,
            source_type: SourceType.MANUAL_OVERRIDE,
            confidence_score: 1.0,
            raw_text_snapshot: "Baseline seeding data.",
          }
        });
      }
      console.log(`  Added ${events.length} events for ${exam.name}`);
    }
  }

  // 3. Link Colleges to Exams based on the old college.exam string array
  console.log("\nLinking Colleges to Exams...");
  const colleges = await prisma.college.findMany();
  
  for (const college of colleges) {
    const examStrings = college.exam || [];
    const examsToConnect = [];

    for (const examStr of examStrings) {
      // Map strings like "JEE Main", "JEE Advanced", "KCET", "BITSAT" to our slugs
      const normalizedStr = examStr.toLowerCase().replace(/[^a-z0-9]/g, '');
      let slugToConnect = null;

      if (normalizedStr.includes('jee')) slugToConnect = 'jee-main';
      else if (normalizedStr.includes('bitsat')) slugToConnect = 'bitsat';
      else if (normalizedStr.includes('kcet') || normalizedStr.includes('kea')) slugToConnect = 'kcet';
      else if (normalizedStr.includes('neet')) slugToConnect = 'neet';
      else if (normalizedStr.includes('cuet')) slugToConnect = 'cuet-ug';

      if (slugToConnect) {
        const examRecord = await prisma.exam.findUnique({ where: { slug: slugToConnect } });
        if (examRecord) {
          examsToConnect.push({ id: examRecord.id });
        }
      }
    }

    if (examsToConnect.length > 0) {
      // deduplicate
      const uniqueExams = Array.from(new Set(examsToConnect.map(e => e.id))).map(id => ({ id }));
      
      await prisma.college.update({
        where: { id: college.id },
        data: {
          acceptedExams: {
            connect: uniqueExams
          }
        }
      });
      console.log(`  Linked ${college.name} to ${uniqueExams.length} exam(s).`);
    }
  }

  // 4. Generate Cutoffs for Courses
  console.log("\nGenerating Cutoffs for Courses...");
  const courses = await prisma.course.findMany({
    include: {
      college: {
        include: {
          acceptedExams: true
        }
      }
    }
  });

  await prisma.cutoff.deleteMany({}); // Reset cutoffs
  console.log(`Cleared old cutoffs.`);

  const newCutoffs = [];
  let cutoffCount = 0;

  for (const course of courses) {
    if (!course.college.acceptedExams || course.college.acceptedExams.length === 0) continue;

    const exam = course.college.acceptedExams[0]; // Take the first accepted exam
    
    // Generate some realistic-looking closing ranks based on college metrics
    const baseRank = course.college.nirf_rank ? course.college.nirf_rank * 50 : 20000;
    
    const categories = ["OPEN", "OBC-NCL", "SC", "ST"];
    
    for (const category of categories) {
      let multiplier = 1;
      if (category === "OBC-NCL") multiplier = 1.5;
      if (category === "SC") multiplier = 3;
      if (category === "ST") multiplier = 5;

      const closingRank = Math.floor(baseRank * multiplier) + Math.floor(Math.random() * 5000);

      newCutoffs.push({
        courseId: course.id,
        exam: exam.name,
        year: currentYear,
        round: 6,
        category: category,
        quota: "AI",
        seat_pool: "Gender-Neutral",
        closing_rank: closingRank > 0 ? closingRank : 1000
      });
      
      cutoffCount++;
      if (newCutoffs.length > 5000) {
        await prisma.cutoff.createMany({ data: newCutoffs });
        newCutoffs.length = 0;
      }
    }
  }

  if (newCutoffs.length > 0) {
    await prisma.cutoff.createMany({ data: newCutoffs });
  }

  console.log(`  Seeded ${cutoffCount} cutoffs.`);

  console.log("\nSeeding and linking complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
