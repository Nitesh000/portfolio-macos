let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
doautoall SessionLoadPre
silent only
silent tabonly
cd ~/Developer/Work/personalWork/websites/portfolio-macos/Portfolio-macOS
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
set shortmess+=aoO
badd +66 src/store/window.js
badd +191 src/hoc/WindowWrapper.jsx
badd +1116 ~/Developer/Work/personalWork/websites/portfolio-macos/Portfolio-macOS/src/constants/index.js
badd +69 src/App.jsx
badd +10 ~/Developer/Work/personalWork/websites/portfolio-macos/Portfolio-macOS/src/windows/Photos.jsx
badd +390 ~/Developer/Work/personalWork/websites/portfolio-macos/Portfolio-macOS/node_modules/gsap/types/draggable.d.ts
badd +27 ~/Developer/Work/personalWork/websites/portfolio-macos/Portfolio-macOS/node_modules/.pnpm/gsap@3.14.2/node_modules/gsap/types/gsap-core.d.ts
argglobal
%argdel
edit src/hoc/WindowWrapper.jsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 158 + 159) / 318)
exe '2resize ' . ((&lines * 30 + 31) / 62)
exe 'vert 2resize ' . ((&columns * 159 + 159) / 318)
exe '3resize ' . ((&lines * 29 + 31) / 62)
exe 'vert 3resize ' . ((&columns * 159 + 159) / 318)
argglobal
balt ~/Developer/Work/personalWork/websites/portfolio-macos/Portfolio-macOS/node_modules/gsap/types/draggable.d.ts
setlocal foldmethod=manual
setlocal foldexpr=0
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=0
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
silent! normal! zE
let &fdl = &fdl
let s:l = 191 - ((55 * winheight(0) + 30) / 60)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 191
normal! 027|
wincmd w
argglobal
if bufexists(fnamemodify("~/Developer/Work/personalWork/websites/portfolio-macos/Portfolio-macOS/src/constants/index.js", ":p")) | buffer ~/Developer/Work/personalWork/websites/portfolio-macos/Portfolio-macOS/src/constants/index.js | else | edit ~/Developer/Work/personalWork/websites/portfolio-macos/Portfolio-macOS/src/constants/index.js | endif
if &buftype ==# 'terminal'
  silent file ~/Developer/Work/personalWork/websites/portfolio-macos/Portfolio-macOS/src/constants/index.js
endif
balt src/store/window.js
setlocal foldmethod=manual
setlocal foldexpr=0
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=0
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
silent! normal! zE
let &fdl = &fdl
let s:l = 1116 - ((2 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 1116
normal! 05|
wincmd w
argglobal
if bufexists(fnamemodify("src/store/window.js", ":p")) | buffer src/store/window.js | else | edit src/store/window.js | endif
if &buftype ==# 'terminal'
  silent file src/store/window.js
endif
balt ~/Developer/Work/personalWork/websites/portfolio-macos/Portfolio-macOS/src/constants/index.js
setlocal foldmethod=manual
setlocal foldexpr=0
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=0
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
silent! normal! zE
let &fdl = &fdl
let s:l = 58 - ((2 * winheight(0) + 14) / 29)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 58
normal! 023|
wincmd w
2wincmd w
exe 'vert 1resize ' . ((&columns * 158 + 159) / 318)
exe '2resize ' . ((&lines * 30 + 31) / 62)
exe 'vert 2resize ' . ((&columns * 159 + 159) / 318)
exe '3resize ' . ((&lines * 29 + 31) / 62)
exe 'vert 3resize ' . ((&columns * 159 + 159) / 318)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
nohlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
