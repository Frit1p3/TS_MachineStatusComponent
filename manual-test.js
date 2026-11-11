import { machineSchema } from './src/schemas/machine.schema.ts'

console.log('='.repeat(50))
console.log('TESTS MANUELS DU SCHÉMA ZOD MACHINE')
console.log('='.repeat(50))

const validData = {
  id: 10,
  name: 'Presse composite A-12',
  status: 'running',
  temperatureC: 82.4,
  currentPhase: 3,
  totalPhases: 5,
  elapsedMinutes: 45,
  updatedAt: new Date().toISOString(),
}

// 1. Test nominal
console.log('\n1. [Test Nominal] Données valides :')
const res1 = machineSchema.safeParse(validData)
console.log('Succès :', res1.success)
if (res1.success) {
  console.log('Données validées :', res1.data)
}

// 2. Test d'erreur croisée (currentPhase > totalPhases)
console.log('\n2. [Test Erreur Croisée] currentPhase (8) > totalPhases (5) :')
const res2 = machineSchema.safeParse({
  ...validData,
  currentPhase: 8,
  totalPhases: 5,
})
console.log('Succès :', res2.success)
if (!res2.success) {
  console.log('Erreurs détectées :')
  res2.error.issues.forEach((issue) => {
    console.log(` - Champ '${issue.path.join('.')}': ${issue.message} (${issue.code})`)
  })
}

// 3. Test de statut invalide et nom vide
console.log('\n3. [Test Invalide] Statut "idle" et nom vide :')
const res3 = machineSchema.safeParse({
  ...validData,
  name: '   ',
  status: 'idle',
})
console.log('Succès :', res3.success)
if (!res3.success) {
  console.log('Erreurs détectées :')
  res3.error.issues.forEach((issue) => {
    console.log(` - Champ '${issue.path.join('.')}': ${issue.message} (${issue.code})`)
  })
}

// 4. Test date non ISO
console.log('\n4. [Test Date Invalide] Format date "2026-10-20" (manque heure/timezone) :')
const res4 = machineSchema.safeParse({
  ...validData,
  updatedAt: '2026-10-20',
})
console.log('Succès :', res4.success)
if (!res4.success) {
  console.log('Erreurs détectées :')
  res4.error.issues.forEach((issue) => {
    console.log(` - Champ '${issue.path.join('.')}': ${issue.message} (${issue.code})`)
  })
}

console.log('\n' + '='.repeat(50))
console.log('FIN DES TESTS MANUELS')
console.log('='.repeat(50))
