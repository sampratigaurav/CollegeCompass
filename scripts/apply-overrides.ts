import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { prisma } from '../src/lib/db';
import fs from 'fs';
import path from 'path';

async function main() {
  const overridesPath = path.resolve(process.cwd(), "data", "manual_overrides.json");
  const overrides = JSON.parse(fs.readFileSync(overridesPath, "utf8"));
  
  for (const [examName, data] of Object.entries(overrides)) {
    if ((data as any).override_active) {
      await prisma.exam.update({
        where: { name: examName },
        data: {
          exam_date: (data as any).exam_date,
          registration_ends: (data as any).registration_ends,
          counselling_starts: (data as any).counselling_starts,
          last_updated_at: new Date(),
          has_changes: true
        }
      });
      console.log(`Updated ${examName}`);
    }
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
