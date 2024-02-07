export default function ErrorPage() {
  return (
    <div className="flex flex-col justify-center align-middle items-center flex-1 h-screen px-8">
      <h1>404 - Página não encontrada</h1>

      <p>Desculpe, mas a página que você está tentando acessar não existe.</p>

      <p>
        Você pode voltar para a página inicial clicando <a href="/" className="text-blue-300" >aqui</a>.
      </p>

    </div>
  )
}