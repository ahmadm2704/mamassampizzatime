Add-Type -AssemblyName System.Drawing

[System.Drawing.Bitmap]$img = [System.Drawing.Image]::FromFile("D:\Websites\MAMASSAMPIZZATIME\public\logoo.png")
$width = $img.Width
$height = $img.Height
$centerX = $width / 2.0
$centerY = $height / 2.0
$radius = [Math]::Min($width, $height) / 2.0 * 0.96

$newImg = New-Object System.Drawing.Bitmap $width, $height
$newImg.MakeTransparent()

for ($x = 0; $x -lt $width; $x++) {
    for ($y = 0; $y -lt $height; $y++) {
        $dx = $x - $centerX
        $dy = $y - $centerY
        $distance = [Math]::Sqrt($dx*$dx + $dy*$dy)
        
        $color = $img.GetPixel($x, $y)
        
        # Check if inside circle
        if ($distance -le $radius) {
            # Make white or near-white transparent
            if ($color.R -ge 245 -and $color.G -ge 245 -and $color.B -ge 245) {
                # Transparent
                $newImg.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
            } else {
                $newImg.SetPixel($x, $y, $color)
            }
        } else {
            $newImg.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        }
    }
}

$newImg.Save("D:\Websites\MAMASSAMPIZZATIME\public\logoo_processed.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
$newImg.Dispose()
Write-Output "Image processing complete."
