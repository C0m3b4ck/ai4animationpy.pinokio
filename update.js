module.exports = {
  run: [
    {
      when: "{{exists('.git')}}",
      method: "shell.run",
      params: {
        message: "git pull --ff-only"
      }
    },
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: "git clone https://github.com/facebookresearch/ai4animationpy app"
      }
    },
    {
      when: "{{exists('app/.git')}}",
      method: "shell.run",
      params: {
        path: "app",
        message: "git pull --ff-only"
      }
    },
    {
      when: "{{exists('app')}}",
      method: "shell.run",
      params: {
        venv: "env",
        venv_python: "3.12.13",
        path: "app",
        message: [
          "uv pip install torch==2.13.0 torchvision==0.28.0 torchaudio==2.11.0 numpy scipy matplotlib scikit-learn einops pygltflib==1.16.5 pyscreenrec==0.6 tqdm pyyaml onnx==1.19.1 raylib soundfile sounddevice",
          "uv pip install fastapi \"uvicorn[standard]\"",
          "uv pip install -e . --no-deps"
        ]
      }
    },
    {
      when: "{{exists('app') && gpu === 'nvidia' && (platform === 'linux' || platform === 'win32')}}",
      method: "shell.run",
      params: {
        venv: "env",
        venv_python: "3.12.13",
        path: "app",
        message: "uv pip install onnxruntime-gpu"
      }
    },
    {
      when: "{{exists('app') && !(gpu === 'nvidia' && (platform === 'linux' || platform === 'win32'))}}",
      method: "shell.run",
      params: {
        venv: "env",
        venv_python: "3.12.13",
        path: "app",
        message: "uv pip install onnxruntime"
      }
    },
    {
      method: "notify",
      params: {
        html: "AI4AnimationPy updated."
      }
    }
  ]
}
