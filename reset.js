module.exports = {
  run: [
    {
      when: "{{exists('app')}}",
      method: "fs.rm",
      params: {
        path: "app"
      }
    },
    {
      when: "{{exists('app/env')}}",
      method: "fs.rm",
      params: {
        path: "app/env"
      }
    },
    {
      when: "{{exists('env')}}",
      method: "fs.rm",
      params: {
        path: "env"
      }
    },
    {
      when: "{{exists('cache')}}",
      method: "fs.rm",
      params: {
        path: "cache"
      }
    },
    {
      method: "notify",
      params: {
        html: "AI4AnimationPy removed. The cloned app, venv, and launcher model cache were deleted. Shared caches under ~/.cache (uv wheels, Hugging Face) are left intact for other apps."
      }
    }
  ]
}
