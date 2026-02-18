$port = 8000
$folder = Get-Location
$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$port/"
$listener.Prefixes.Add($prefix)
try {
    $listener.Start()
} catch {
    Write-Error "Failed to start listener. Try running PowerShell as Administrator or choose a different port. $_"
    exit 1
}
Write-Output "Serving $folder on http://localhost:$port/"

$mimes = @{
    '.html' = 'text/html'; '.htm'='text/html'; '.css'='text/css'; '.js'='application/javascript';
    '.png'='image/png'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.svg'='image/svg+xml';
    '.json'='application/json'; '.txt'='text/plain'; '.pdf'='application/pdf'; '.ico'='image/x-icon';
}

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $req = $context.Request
    $resp = $context.Response
    $url = $req.Url.AbsolutePath.TrimStart('/')
    if ($url -eq '') { $url = 'index.html' }
    $file = Join-Path $folder $url

    if (-not (Test-Path $file)) {
        $resp.StatusCode = 404
        $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
        $resp.ContentLength64 = $buffer.Length
        $resp.OutputStream.Write($buffer, 0, $buffer.Length)
        $resp.Close()
        continue
    }

    $ext = [System.IO.Path]::GetExtension($file).ToLower()
    $mime = $mimes[$ext]
    if (-not $mime) { $mime = 'application/octet-stream' }

    try {
        $bytes = [System.IO.File]::ReadAllBytes($file)
        $resp.ContentType = $mime
        $resp.ContentLength64 = $bytes.Length
        $resp.OutputStream.Write($bytes, 0, $bytes.Length)
        $resp.Close()
    } catch {
        $resp.StatusCode = 500
        $buffer = [System.Text.Encoding]::UTF8.GetBytes("500 Internal Server Error")
        $resp.ContentLength64 = $buffer.Length
        $resp.OutputStream.Write($buffer, 0, $buffer.Length)
        $resp.Close()
    }
}

$listener.Stop()
$listener.Close()
