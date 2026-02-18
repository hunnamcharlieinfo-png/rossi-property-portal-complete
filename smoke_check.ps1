$base = 'http://localhost:8000'
$paths = @('/', '/properties.html', '/login.html', '/favorites.html', '/profile.html', '/js/properties.js', '/js/main.js', '/js/dashboard.js', '/js/auth.js')

foreach ($p in $paths) {
    $url = $base.TrimEnd('/') + $p
    try {
        $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10
        $code = $r.StatusCode
        Write-Output "$p -> OK $code"
    } catch {
        $resp = $_.Exception.Response
        if ($null -ne $resp) {
            try { $code = $resp.StatusCode.Value__ } catch { $code = 'N/A' }
            Write-Output "$p -> ERR $code"
        } else {
            Write-Output "$p -> ERR (no response)"
        }
    }
}
