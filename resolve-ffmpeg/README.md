# CODECs in DaVinci Resolve 17.1 and FFMPEG

## Lossless

### With alpha channel

* Apple ProRes:

    * Davinci Resolve decode: yes, *with* alpha
    * Davinci Resolve encode: none
    * ffmpeg git@2021-01-09 decode: yes, *with* alpha
    * ffmpeg git@2021-01-09 encode: yes, *with* alpha
    * ffmpeg options:
      * YUV 4:2:2 10-bits: `-pix_fmt yuv444p10 -c:v prores_ks -profile:v hq  prores-yuva444p10.mov`
      * YUV 4:4:4 10-bits: `-pix_fmt yuv444p10 -c:v prores_ks -profile:v 4444xq  prores-yuva444p10.mov`
      * YUV**A** 4:4:4 10-bits: `-pix_fmt yuva444p10 -c:v prores_ks -profile:v 4444xq  prores-yuva444p10.mov`

### No alpha channel

* GoPro CineForm:

   * Davinci Resolve decode: yes, *without* alpha. Native, YUV 10-bit in .avi/.mov, RGB 16-bit in `.mov`
   * Davinci Resolve encode: YUV 10-bit (RGB 16-bit alpha export in `.avi`)
   * ffmpeg git@2021-01-09 decode: yes, with alpha
   * ffmpeg git@2021-01-09 encode: yes, with alpha
   * ffmpeg options:
      * RGB 12-bits: `-pix_fmt gbrp12 -c:v cfhd -quality film3+ cineform-rgbp12.avi`

* DNxHD, *no alpha* support in CODEC

   * Davinci Resolve decode: yes
   * Davinci Resolve encode: 444 (10-bit, 12-bit), HQX (10-bit, 12-bit), HQ, LB, SQ (alpha export except LB) in `.mov`
   * ffmpeg git@2021-01-09 decode: yes
   * ffmpeg git@2021-01-09 encode: yes
   * ffmpeg options:
      * YUV 4:2:2 8-bits: `-pix_fmt yuv422p -c:v dnxhd -profile:v dnxhr_hq dnxhd-yuv422p.mov`
      * YUV 4:2:2 10-bits: `-pix_fmt yuv422p10 -c:v dnxhd -profile:v dnxhr_hqx dnxhd-yuv422p10.mov`
      * YUV 4:4:4 10-bits: `-pix_fmt yuv444p10 -c:v dnxhd -profile:v dnxhr_444 dnxhd-yuv444p10.mov`

## Lossy

### No alpha channel

* H.264, *no* alpha support in CODEC

   * Davinci Resolve decode: yes (GPU accelerated in Studio)
   * Davinci Resolve encode: yes (GPU accelerated in Studio)
   * ffmpeg git@2021-01-09 decode: yes
   * ffmpeg git@2021-01-09 encode: yes
   * ffmpeg options:
      * YUV 4:2:0 8-bits: `-pix_fmt yuv420p -c:v libx264 -preset superfast -tune fastdecode -g 1 -crf 17 h264-yuv420p.mp4`

* H.265

   * Davinci Resolve decode: yes, *without* alpha (GPU accelerated in Studio)
   * Davinci Resolve encode: Studio only (GPU accelerated on Intel)
   * ffmpeg git@2021-01-09 decode: yes, no alpha (yet)
   * ffmpeg git@2021-01-09 encode: yes, no alpha (yet)
   * ffmpeg options:
      * YUV 4:2:0 8-bits: `-pix_fmt yuv420p -c:v libx265 -preset superfast -tune fastdecode -g 1 -crf 21 h265-yuv420p.mp4`
      * YUV 4:2:0 10-bits: `-pix_fmt yuv420p10 -c:v libx265 -preset superfast -tune fastdecode -g 1 -crf 21 h265-yuv420p10.mp4`

* VP9

   * Davinci Resolve decode: yes, *without* alpha
   * Davinci Resolve encode: none
   * ffmpeg git@2021-01-09 decode: yes, with alpha
   * ffmpeg git@2021-01-09 encode: yes, with alpha
   * ffmpeg options:
      * YUV**A** 4:2:0 8-bits: `-pix_fmt yuva420p -c:v vp9 -g 1 -crf 32 vp9-yuva420p.mp4`

## References

* [Davinci 16 Supported CODEC List](https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_16_Supported_Codec_List.pdf)
* [Alpha Masking with FFMPEG](https://curiosalon.github.io/blog/ffmpeg-alpha-masking/)
* [Avisynth+ <--> Davinci Resolve 16](https://forum.doom9.org/showthread.php?t=176877)
* [Apple ProRes White Paper](https://www.apple.com/final-cut-pro/docs/Apple_ProRes_White_Paper.pdf)
* `ffmpeg -h encoder=prores_ks` `ffmpeg -h encoder=prores_aw` `ffmpeg -h encoder=prores`
* `ffmpeg -h encoder=cfhd`
* `ffmpeg -h encoder=dnxhd`
* `ffmpeg -h encoder=vp9`
* `ffmpeg -h encoder=libx264` `x264 --fullhelp`
* `ffmpeg -h encoder=libx265` `x265 --fullhelp`
