'use client'

type FirebaseConfig = {
  apiKey: string
  authDomain: string
  projectId: string
  appId: string
}

let cachedConfig: FirebaseConfig | null = null

function getFirebaseConfig(): FirebaseConfig | null {
  if (cachedConfig) return cachedConfig

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID

  if (!apiKey || !authDomain || !projectId || !appId) {
    return null
  }

  cachedConfig = { apiKey, authDomain, projectId, appId }
  return cachedConfig
}

export async function firebaseSignIn(email: string, password: string) {
  const config = getFirebaseConfig()
  if (!config) {
    throw new Error('Firebase config is missing')
  }

  const { initializeApp, getApps } = await import('firebase/app')
  const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth')

  const app = getApps().length ? getApps()[0] : initializeApp(config)
  const auth = getAuth(app)
  const credential = await signInWithEmailAndPassword(auth, email, password)
  return credential.user
}

export async function firebaseSignOut() {
  const config = getFirebaseConfig()
  if (!config) return

  const { initializeApp, getApps } = await import('firebase/app')
  const { getAuth, signOut } = await import('firebase/auth')

  const app = getApps().length ? getApps()[0] : initializeApp(config)
  const auth = getAuth(app)
  await signOut(auth)
}
