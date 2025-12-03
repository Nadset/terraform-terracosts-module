'use client'

import { useState } from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface Report {
  detected_providers: string[]
  clouds: string[]
  total_resources: number
  suggestions: string[]
  estimated_savings: string
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('https://api.terracosts.com/scan', {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) throw new Error('Upload échoué')
      const data = await response.json()
      setReport(data)
    } catch (err: any) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}>
      <h1 className="text-6xl font-bold mb-8">Bienvenue sur Terracosts !</h1>
      <p className="text-2xl mb-8">Ton outil FinOps multi-cloud via Terraform. Économies automatiques sur AWS, Azure, GCP.</p>

      <form onSubmit={handleUpload} className="mb-8 p-4 border rounded bg-gray-100">
        <input
          type="file"
          accept=".json"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="mb-4 p-2 border rounded"
        />
        <button type="submit" disabled={!file || loading} className="bg-blue-600 px-8 py-3 rounded-lg text-white hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Analyse en cours...' : 'Upload State JSON & Analyser'}
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">Erreur : {error}</p>}

      {report && (
        <div className="bg-white p-6 rounded shadow-md max-w-4xl w-full">
          <h2 className="text-2xl font-bold mb-4">Rapport FinOps Généré</h2>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Providers Détectés</th>
                <th className="border border-gray-300 p-2">Clouds</th>
                <th className="border border-gray-300 p-2">Ressources Totales</th>
                <th className="border border-gray-300 p-2">Économies Potentielles</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">{report.detected_providers?.join(', ') || 'Aucun'}</td>
                <td className="border border-gray-300 p-2">{report.clouds?.join(', ') || 'Aucun'}</td>
                <td className="border border-gray-300 p-2">{report.total_resources}</td>
                <td className="border border-gray-300 p-2 font-bold text-green-600">{report.estimated_savings}</td>
              </tr>
            </tbody>
          </table>
          <h3 className="text-xl font-bold mb-2">Suggestions d'Optimisation</h3>
          <ul className="list-disc list-inside">
            {report.suggestions?.map((sug, i) => (
              <li key={i} className="mb-2 p-2 bg-yellow-100 rounded">{sug}</li>
            )) || <li>Aucune suggestion pour l'instant</li>}
          </ul>
        </div>
      )}

      <a href="https://api.terracosts.com" className="mt-8 bg-green-600 px-8 py-3 rounded-lg text-white hover:bg-green-700">
        Tester l&apos;API Directe
      </a>
    </main>
  )
}
