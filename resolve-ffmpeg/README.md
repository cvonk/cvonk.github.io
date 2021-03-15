# Exchange video with alpha channel between DaVinci Resolve and FFMPEG

My quest: exchange video with an alpha (transparency) channel between DaVinci Resolve and FFMPEG.

## Lossless

### With alpha channel

* Apple ProRes:

    * Davinci Resolve decode: YUV 4:4:4 (10-bits) *with* alpha, YUV 4:4:4 (10-bits), YUV 4:2:2 (10-bits)
    * Davinci Resolve encode: none
    * ffmpeg git@2021-01-09 decode: yes, *with* alpha
    * ffmpeg git@2021-01-09 encode: yes, *with* alpha
    * ffmpeg options:
      * YUV**A** 4:4:4 10-bits: `-pix_fmt yuva444p10 -c:v prores_ks -profile:v 4444xq  prores-yuva444p10.mov`
    * ffmpeg options without alpha:
      * YUV 4:2:2 10-bits: `-pix_fmt yuv422p10 -c:v prores_ks -profile:v hq  prores-yuv422p10.mov`
      * YUV 4:4:4 10-bits: `-pix_fmt yuv444p10 -c:v prores_ks -profile:v 4444xq  prores-yuv444p10.mov`

### No alpha channel

* GoPro CineForm:

   * Davinci Resolve decode: Native, YUV 10-bit, RGB 16-bit. *No* alpha. 
   * Davinci Resolve encode: YUV 10-bit, RGB 16-bit. *No* alpha
   * ffmpeg git@2021-01-09 decode: yes, with alpha
   * ffmpeg git@2021-01-09 encode: yes, with alpha
   * ffmpeg options:
      * RGB 12-bits: `-pix_fmt gbrp12 -c:v cfhd -quality film3+ cineform-rgbp12.avi`

* DNxHR

   * Davinci Resolve decode: YUV 4:4:4 (10-bits), YUV (4:2:2 8/10-bits). Somehow *no alpha* support, for all I could detect
   * Davinci Resolve encode: YUV 4:4:4 10/12-bit, YUV 4:2:2 10/12-bit, YUV 4:2:2 8-bit.  *Alpha* in 12-bit except for LB.
   * ffmpeg git@2021-01-09 decode: yes
   * ffmpeg git@2021-01-09 encode: yes, but no 12-bit
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

   * Davinci Resolve decode: YUV 4:2:0 (8/10-bits). *No* alpha support. (GPU accelerated in Studio)
   * Davinci Resolve encode: Studio only (GPU accelerated on Intel)
   * ffmpeg git@2021-01-09 decode: yes, no alpha (yet)
   * ffmpeg git@2021-01-09 encode: yes, no alpha (yet)
   * ffmpeg options:
      * YUV 4:2:0 8-bits: `-pix_fmt yuv420p -c:v libx265 -preset superfast -tune fastdecode -g 1 -crf 21 h265-yuv420p.mp4`
      * YUV 4:2:0 10-bits: `-pix_fmt yuv420p10 -c:v libx265 -preset superfast -tune fastdecode -g 1 -crf 21 h265-yuv420p10.mp4`

* VP9

   * Davinci Resolve decode: YUV 4:2:0 8-bits. *No* alpha support.
   * Davinci Resolve encode: none
   * ffmpeg git@2021-01-09 decode: yes, with alpha
   * ffmpeg git@2021-01-09 encode: yes, with alpha
   * ffmpeg options:
      * YUV**A** 4:2:0 8-bits: `-pix_fmt yuva420p -c:v vp9 -g 1 -crf 32 vp9-yuva420p.mp4`

## Thoughts

The best choice would be `DNxHR`.  DaVinci Resolve 17.1 supports `DNxHR` with alpha in 12-bits decode/encode, what makes it a great candidate.  However, ffmpeg can not transcode to 12-bit.

The second best choice would be `Apple ProRes`.  DaVinci Resolve 17.1 can import it with alpha channel, but not export it.  ffmpeg can decode/encode it with alpha.

## References

* [Davinci 16 Supported CODEC List](https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_16_Supported_Codec_List.pdf)
* [Alpha Masking with FFMPEG](https://curiosalon.github.io/blog/ffmpeg-alpha-masking/)
* [Avisynth+ <--> Davinci Resolve 16](https://forum.doom9.org/showthread.php?t=176877)
* [Apple ProRes White Paper](https://www.apple.com/final-cut-pro/docs/Apple_ProRes_White_Paper.pdf)
* [Using FFMPEG for DNxHD/DNxHR encoding, resizing, and batch encoding](http://macilatthefront.blogspot.com/2018/12/tutorial-using-ffmpeg-for-dnxhddnxhr.html)
* `ffmpeg -h encoder=prores_ks` `ffmpeg -h encoder=prores_aw` `ffmpeg -h encoder=prores`
* `ffmpeg -h encoder=cfhd`
* `ffmpeg -h encoder=dnxhd`
* `ffmpeg -h encoder=vp9`
* `ffmpeg -h encoder=libx264` `x264 --fullhelp`
* `ffmpeg -h encoder=libx265` `x265 --fullhelp`
