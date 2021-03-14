# CODECs in DaVinci Resolve 17.1 and FFMPEG

## Lossless

### With alpha channel

* Apple ProRes:

    * Davinci Resolve decode: 422, 422 HQ, 422 LT, 422 Proxy, 4444, 4444 XQ in .mov
    * Davinci Resolve encode: none
    * ffmpeg git@2021-01-09 decode: yes, with alpha
    * ffmpeg git@2021-01-09 encode: yes, with alpha
    * `ffmpeg -i lagarith-rgbap.avi -pix_fmt yuva444p10le -c:v prores_ks -profile:v 4444  prores_ks-yuva444p10.mov`

### No alpha channel

* GoPro CineForm:

   * Davinci Resolve decode: Native, YUV 10-bit in .avi/mov, RGB 16-bit in .mov
   * Davinci Resolve encode: YUV 10-bit (RGB 16-bit alpha export in .avi)
   * ffmpeg git@2021-01-09 decode: yes, with alpha
   * ffmpeg git@2021-01-09 encode: yes, with alpha
   * `ffmpeg -i lagarith-rgbap.avi -c:v cfhd -quality film3+ cineform-rgbap12.avi`

* DNxHD, *no alpha* support in codec

   * Davinci Resolve decode: yes
   * Davinci Resolve encode: 444 (10-bit, 12-bit), HQX (10-bit, 12-bit), HQ, LB, SQ (alpha export except LB) in .mov
   * ffmpeg git@2021-01-09 decode: yes
   * ffmpeg git@2021-01-09 encode: yes
   * `ffmpeg -i lagarith-rgbap.avi -pix_fmt yuv420p10le -c:v dnxhd -profile:v dnxhr_hqx dnxhd-yuv422p10.mov`

## Lossy

### No alpha channel

* H.264, *no* alpha support in codec

   * Davinci Resolve decode: yes (GPU accelerated in Studio) in mp4
   * Davinci Resolve encode: yes (GPU accelerated in Studio) in mp4
   * ffmpeg git@2021-01-09 decode: yes, with alpha
   * ffmpeg git@2021-01-09 encode: yes, with alpha
   * `ffmpeg -i lagarith-rgbap.avi -pix_fmt yuv420p -c:v libx264 -preset superfast -tune fastdecode -x264-params keyint=1:crf=17 h264-yuv420p.mp4`

* H.265

   * Davinci Resolve decode: yes (GPU accelerated in Studio) in mp4
   * Davinci Resolve encode: Studio only (GPU accelerated on Intel) in mp4
   * ffmpeg git@2021-01-09 decode: yes, no alpha yet
   * ffmpeg git@2021-01-09 encode: yes, no alpha yet
   * `ffmpeg -i lagarith-rgbap.avi -pix_fmt yuv420p -c:v libx265 -preset superfast -tune fastdecode -x265-params keyint=1:crf=21 h265-yuv420p.mp4`
   * `ffmpeg -i lagarith-rgbap.avi -pix_fmt yuv420p10 -c:v libx265 -preset superfast -tune fastdecode -x265-params keyint=1:crf=21 h265-yuv420p10.mp4`
   * `ffmpeg -i lagarith-rgbap.avi -pix_fmt yuv420p12 -c:v libx265 -preset superfast -tune fastdecode -x265-params keyint=1:crf=21 h265-yuv420p12.mp4`
   * `ffmpeg -i lagarith-rgbap.avi -pix_fmt yuv444p -c:v libx265 -preset superfast -tune fastdecode -x265-params keyint=1:crf=21 h265-yuv444p.mp4`
   * `ffmpeg -i lagarith-rgbap.avi -pix_fmt yuv444p10 -c:v libx265 -preset superfast -tune fastdecode -x265-params keyint=1:crf=21 h265-yuv444p10.mp4`
   * `ffmpeg -i lagarith-rgbap.avi -pix_fmt yuv444p12 -c:v libx265 -preset superfast -tune fastdecode -x265-params keyint=1:crf=21 h265-yuv444p12.mp4`
   * `ffmpeg -i lagarith-rgbap.avi -pix_fmt rgb24 -c:v libx265 -preset superfast -tune fastdecode -x265-params keyint=1:crf=21 h265-rgbp.mp4`
   * `ffmpeg -i lagarith-rgbap.avi -pix_fmt rgb48 -c:v libx265 -preset superfast -tune fastdecode -x265-params keyint=1:crf=21 h265-rgbp12le.mp4`

* VP9

   * Davinci Resolve decode: yes, in .mp4/.mov
   * Davinci Resolve encode: none
   * ffmpeg git@2021-01-09 decode: yes, with alpha
   * ffmpeg git@2021-01-09 encode: yes, with alpha
   * `ffmpeg -i lagarith-rgbap.avi -pix_fmt yuva420p -c:v vp9 -crf 32 vp9-yuva420p.mp4`

## References

* [Davinci 16 Supported CODEC List](https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_16_Supported_Codec_List.pdf)
* [Alpha Masking with FFMPEG](https://curiosalon.github.io/blog/ffmpeg-alpha-masking/)
* [Avisynth+ <--> Davinci Resolve 16](https://forum.doom9.org/showthread.php?t=176877)
* `ffmpeg -h encoder=prores_ks` `ffmpeg -h encoder=prores_aw` `ffmpeg -h encoder=prores`
* `ffmpeg -h encoder=cfhd`
* `ffmpeg -h encoder=dnxhd`
* `ffmpeg -h encoder=vp9`
* `ffmpeg -h encoder=libx264` `x264 --fullhelp`
* `ffmpeg -h encoder=libx265` `x265 --fullhelp`
