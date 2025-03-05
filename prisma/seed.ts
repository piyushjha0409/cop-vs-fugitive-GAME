// prisma/seed.ts
import prisma from "@/lib/client";


async function main() {
  await prisma.city.createMany({
    data: [
      { name: 'Yapkashnagar', distance: 60 },
      { name: 'Lihaspur', distance: 50 },
      { name: 'Narmis City', distance: 40 },
      { name: 'Shekharvati', distance: 30 },
      { name: 'Nuravgram', distance: 20 },
    ],
  });

  await prisma.vehicle.createMany({
    data: [
      { kind: 'EV Bike', range: 60, count: 2 },
      { kind: 'EV Car', range: 100, count: 1 },
      { kind: 'EV SUV', range: 120, count: 1 },
    ],
  });

  await prisma.cop.createMany({
    data: [
      { name: 'Cop 1' },
      { name: 'Cop 2' },
      { name: 'Cop 3' },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });