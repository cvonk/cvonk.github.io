# CODECs in DaVinci Resolve 17.1

## Lossless

### With alpha channel

* Apple ProRes:

    * Davinci Resolve 16 decode: 422, 422 HQ, 422 LT, 422 Proxy, 4444, 4444 XQ in .mov
    * Davinci Resolve 16 encode: none
    * fffmpeg git@2021-01-09 decode: yes, with alpha
    * fffmpeg git@2021-01-09 encode: yes, with alpha (`.\ffmpeg.exe -i lagarith-rgbap.avi -pix_fmt yuva444p10le -c:v prores_ks -profile:v 4444  prores_ks-yuva444p10.mov`)
    * see `.\ffmpeg -h encoder=prores_ks` or `.\ffmpeg -h encoder=prores_aw` or `.\ffmpeg -h encoder=prores`

### No alpha channel

* GoPro CineForm:

   * Davinci Resolve 16 decode: Native, YUV 10-bit in .avi/mov, RGB 16-bit in .mov
   * Davinci Resolve 16 encode: YUV 10-bit (RGB 16-bit alpha export in .avi)
   * fffmpeg git@2021-01-09 decode: yes, with alpha
   * fffmpeg git@2021-01-09 encode: yes, with alpha (`.\ffmpeg.exe -i lagarith-rgbap.avi -c:v cfhd -quality film3+ cineform-   * rgbap12.avi`)
   * see `.\ffmpeg -h encoder=cfhd`

* DNxHD, *no alpha* support in codec

   * Davinci Resolve 16 decode: yes
   * Davinci Resolve 16 encode: 444 (10-bit, 12-bit), HQX (10-bit, 12-bit), HQ, LB, SQ (alpha export except LB) in .mov
   * fffmpeg git@2021-01-09 decode: yes
   * fffmpeg git@2021-01-09 encode: yes (`.\ffmpeg.exe -i lagarith-rgbap.avi -pix_fmt yuv422p10le -c:v dnxhd -profile:v dnxhr_hqx dnxhd-yuv422p10.mov`)
   * see `.\ffmpeg -h encoder=dnxhd`

## Lossy

### No alpha channel

* VP9

   * Davinci Resolve 16 decode: yes, in .mp4/.mov
   * Davinci Resolve 16 encode: none
   * fffmpeg git@2021-01-09 decode: ??
   * fffmpeg git@2021-01-09 encode: yes, with alpha (`.\ffmpeg.exe -i lagarith-rgbap.avi -pix_fmt yuva420p -c:v vp9 -crf 32 vp9-yuva420p.mp4`)
   * see `.\ffmpeg -h encoder=vp9`

* H.264, *no* alpha support in codec

   * Davinci Resolve 16 decode: yes (GPU accelerated in Studio) in mp4
   * Davinci Resolve 16 encode: yes (GPU accelerated in Studio) in mp4
   * fffmpeg git@2021-01-09 decode: yes
   * fffmpeg git@2021-01-09 encode: yes (`.\ffmpeg.exe -i lagarith-rgbap.avi -c:v libx264 -preset faster -tune fastdecode -x264-params keyint=15:bframes=3:crf=17 h264-yuv444p.mp4`)
   * see `.\ffmpeg -h encoder=libx264` or `.\x264 --fullhelp`

* H.265

   * Davinci Resolve 16 decode: yes (GPU accelerated in Studio) in mp4
   * Davinci Resolve 16 encode: Studio only (GPU accelerated on Intel) in mp4
   * fffmpeg git@2021-01-09 decode: yes, alpha not yet
   * fffmpeg git@2021-01-09 encode: yes, alpha not yet (`.\ffmpeg.exe -i lagarith-rgbap.avi -c:v libx265 -preset faster -tune fastdecode -x265-params keyint=15:bframes=3:crf=17 h265-rgbp.mp4`)
   * see `.\ffmpeg -h encoder=libx265` or `.\x265 --fullhelp`

## References

* (Davinci 16 supported codec list)[https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_16_Supported_Codec_List.pdf]
* (ffmpeg alpha masking)[https://curiosalon.github.io/blog/ffmpeg-alpha-masking/]
* (Avisynth+ <--> Davinci Resolve 16)[https://forum.doom9.org/showthread.php?t=176877]
