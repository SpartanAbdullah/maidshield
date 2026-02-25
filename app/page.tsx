export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-semibold tracking-tight">
          MaidShield
        </h1>

        <p className="mt-6 text-lg text-slate-600 max-w-2xl">
          Domestic worker settlement & compliance assistant for UAE households.
        </p>

        <div className="mt-10 flex gap-4">
          <a
            href="/calculator"
            className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
          >
            Start Calculation
          </a>

          <a
            href="#how-it-works"
            className="px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </main>
  );
}