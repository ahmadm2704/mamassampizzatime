Add-Type -AssemblyName System.Drawing

$filePath = "D:\Websites\MAMASSAMPIZZATIME\public\logoo_original.png"
if (-not (Test-Path $filePath)) {
    $filePath = "D:\Websites\MAMASSAMPIZZATIME\public\logoo.png"
}

$img = [System.Drawing.Image]::FromFile($filePath)
$w = $img.Width
$h = $img.Height

# find background color from (0,0)
$bg = $img.GetPixel(0,0)

# find bounds
$minX = $w; $maxX = 0; $minY = $h; $maxY = 0;
for ($x=0; $x -lt $w; $x++) {
    for ($y=0; $y -lt $h; $y++) {
        $c = $img.GetPixel($x,$y)
        $diff = [Math]::Abs($c.R - $bg.R) + [Math]::Abs($c.G - $bg.G) + [Math]::Abs($c.B - $bg.B)
        if ($diff -gt 30) { # Threshold to detect non-background
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

# Add a tiny padding fallback if bounds failed
if ($minX -ge $maxX) { $minX=0; $maxX=$w-1; $minY=0; $maxY=$h-1; }

$boxW = $maxX - $minX + 1
$boxH = $maxY - $minY + 1

$newImg = New-Object System.Drawing.Bitmap $boxW, $boxH
$newImg.MakeTransparent()

$cx = $minX + ($boxW / 2.0)
$cy = $minY + ($boxH / 2.0)
$radius = ([Math]::Min($boxW, $boxH) / 2.0) * 0.98

for ($x=0; $x -lt $boxW; $x++) {
    for ($y=0; $y -lt $boxH; $y++) {
        $srcX = $x + $minX
        $srcY = $y + $minY
        
        $dx = $srcX - $cx
        $dy = $srcY - $cy
        $dist = [Math]::Sqrt($dx*$dx + $dy*$dy)
        
        if ($dist -le $radius) {
            $newImg.SetPixel($x, $y, $img.GetPixel($srcX, $srcY))
        } else {
            $newImg.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        }
    }
}

$newImg.Save("D:\Websites\MAMASSAMPIZZATIME\public\logoo-transparent.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
$newImg.Dispose()
Write-Output "Smart circle crop complete!"
