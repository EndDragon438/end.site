# end.site
all code and assets for my personal site and blog at https://end-draconis.neocities.org !!

## Mini Static Site Generator

I've built a lil super specific SSG just for my site! I format my creations
as TOML files, then build them into HTML pages with the SSG. It also handles
other things, like tag pages, the blog homepage, and serverless server-side
includes. You're welcome to draw inspiration from it, or even copy it directly
if you like (though good luck working with something that isn't my site lol),
it's licensed under the GPLv3, a free, copyleft license.

## TODO:
- rework socials page into Contacts, make better (no dropdowns, lists)
- finish DC Encoder
- debug DC Decoder/Encoder (kidnap some testers)
- write library propaganda post (blog)
- starter guide to building a website (SSGs, hosts, code, etc.)
- USA legal resources post
- playable audio in Creations/Music
- option for more paragraphs in post generator (for loop based on postParas)
- last.fm recently played widget (may need supporter, or python implementation)
- add guestbook (supporter, or python implementation)
- move more projects onto site
- join (or start :3) webrings
- Stylesheet
    - Figure out how to render scroll bar under header/footer
    - Swap to using variables everywhere
    - Build several themes; build theme switcher, default to legible theme (if no js)
    - Add styling for `creation-tags` (list style none, horizontal list)
- Mini SSG
    - Rebuild with pseudo-Liquid templating
    - Swap post data format to TOML
    - Check if Github Actions can run the SSG script on push
    - Build RSS generator (select for category, creation type, etc.)