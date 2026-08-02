module.exports = async (kernel) => {
  const HOST = process.env.HOST || "127.0.0.1"
  const PORT = process.env.PORT || `${await kernel.port()}`
  return {
    daemon: true,
    run: [{
      method: "shell.run",
      params: {
        path: ".",
        venv: "app/env",
        venv_python: "3.12.13",
        env: {
          HOST,
          PORT
        },
        message: "python webdemo/run.py",
        on: [{
          event: "/(http:\\/\\/[0-9.:]+)/",
          done: true
        }]
      }
    }, {
      method: "local.set",
      params: {
        url: "{{input.event[1]}}"
      }
    }]
  }
}
