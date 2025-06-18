import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Hash password
  const hashedPassword = await bcrypt.hash('admin123', 12)

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Administrator',
      password: hashedPassword,
      role: 'ADMIN',
      emailVerified: true,
    },
  })

  console.log('👤 Created admin user:', admin)

  // Create regular user
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Regular User',
      password: hashedPassword,
      role: 'USER',
      emailVerified: true,
    },
  })

  console.log('👤 Created regular user:', user)

  // Create user settings
  await prisma.userSettings.upsert({
    where: { userId: admin.id },
    update: {},
    create: {
      userId: admin.id,
      theme: 'dark',
      language: 'pt-BR',
      emailNotifications: true,
      pushNotifications: true,
    },
  })

  await prisma.userSettings.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      theme: 'light',
      language: 'pt-BR',
      emailNotifications: true,
      pushNotifications: false,
    },
  })

  console.log('⚙️ Created user settings')

  // Create sample notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: admin.id,
        type: 'SYSTEM',
        title: 'Bem-vindo!',
        message: 'Sua conta foi criada com sucesso.',
      },
      {
        userId: user.id,
        type: 'INFO',
        title: 'Perfil Completo',
        message: 'Complete seu perfil para uma melhor experiência.',
      },
    ],
  })

  console.log('🔔 Created sample notifications')

  console.log('✅ Seed completed successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
