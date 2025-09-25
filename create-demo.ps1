# Demo GIF oluşturma script'i
param(
    [string]$OutputPath = "demo.gif",
    [int]$Duration = 15
)

Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Windows.Forms

Write-Host "Demo GIF oluşturuluyor..." -ForegroundColor Green

# Browser penceresi için bekle
Start-Sleep -Seconds 3

# Screenshot klasörü oluştur
$tempDir = "temp_screenshots"
if (Test-Path $tempDir) { Remove-Item $tempDir -Recurse -Force }
New-Item -ItemType Directory -Path $tempDir | Out-Null

Write-Host "Screenshots alınıyor..." -ForegroundColor Yellow

# Demo için screenshot'lar al
for ($i = 1; $i -le 30; $i++) {
    # Screenshot al
    $bounds = [System.Drawing.Rectangle]::FromLTRB(0, 0, 1920, 1080)
    $bmp = New-Object System.Drawing.Bitmap $bounds.width, $bounds.height
    $graphics = [System.Drawing.Graphics]::FromImage($bmp)
    $graphics.CopyFromScreen($bounds.Location, [System.Drawing.Point]::Empty, $bounds.size)

    # Kaydet
    $filename = "$tempDir\frame_$($i.ToString('000')).png"
    $bmp.Save($filename, [System.Drawing.Imaging.ImageFormat]::Png)

    $graphics.Dispose()
    $bmp.Dispose()

    Write-Host "Frame $i/30 kaydedildi" -ForegroundColor Gray
    Start-Sleep -Milliseconds 500
}

Write-Host "Demo frames oluşturuldu!" -ForegroundColor Green
Write-Host "Manuel olarak GIF oluşturmak için ScreenToGif kullanın veya online converter kullanın." -ForegroundColor Cyan