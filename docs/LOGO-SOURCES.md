# Logo inventory

Researched and prepared for local review on 2026-09-30. Originals are preserved in `logos/`; downloaded files and URL/SHA-256 manifests are in `logos/sourced/`. `public/logos/` contains local PNGs. The user-supplied GLAL file is copied there unchanged and rendered black with CSS; the other prepared logos retain their original artwork and colours. No third-party image requests are needed by visitors.

Logos identify games and user-supplied broadcast credits, not sponsors or an endorsement. League umbrella marks do not imply top-division participation. The NLC credit remains explicitly 3rd/4th Division and EWC remains a Greek rebroadcast.

## Displayed assets

| Asset | Source | Placement / context |
| --- | --- | --- |
| League of Legends | [Riot press resources](https://www.riotgames.com/en/press) | Main game, original gold wordmark |
| VALORANT | [Riot press resources](https://www.riotgames.com/en/press) | Black logotype from official ZIP |
| Teamfight Tactics | [Riot press resources](https://www.riotgames.com/en/press) | Black horizontal logotype from official ZIP |
| Counter-Strike 2 | [Esports World Cup](https://esportsworldcup.com/en) | Game mark from the official EWC asset CDN |
| Formula 1 | [Formula 1](https://www.formula1.com) | Original red F1 mark; secondary interest |
| Greek Legends | User-supplied `GLL_logo_black.png` | Generic league mark retained as a separate asset, no longer used for the Amateur League credit |
| Greek Legends Amateur League | User-supplied `GLAL_LOGO.png` | Dedicated GLAL mark in the moving credits and roadmap; white source rendered black via CSS on the light site backgrounds |
| Greek Legends 2nd Division | [Leaguepedia GL2D 2024 Summer](https://lol.fandom.com/wiki/GL2D/2024_Season/Summer_Season) | Dedicated historical GL2D shield from the tournament infobox, replacing the shared mark in both roadmap translations |
| HESF / Hellenic Esports Federation | User-supplied `hesf_logo.png`; matches [HESF Leagues](https://hesfleagues.com) and the [federation](https://www.hellenicesf.gr/) | Prime, explicitly the 1st Division of HESF Leagues; credit links to both the [Prime portal](https://hesfleagues.com/prime) and federation |
| Gamers United | [Gamers United Cyprus](https://www.gamersunited.cy/) | Official full wordmark, acquired from the rendered website after its automatic browser verification completed |
| AGENCY | User-supplied `AGENCY_LOGO_5.png` | Community section, dark background preserves white lettering |
| INSPOT | [INSPOT](https://www.inspot.gr) | Official website SVG |
| Esports Summit | [Esports Summit Greece](https://esportssummit.gr) | Official ES26 mark; website identifies this as the first Greek Summit |
| Esports Nations Cup | [ENC](https://esportsnationscup.com/en) | Official black mark; user confirmed this event URL |
| Esports World Cup | [EWC](https://esportsworldcup.com/en) | Official black acronym mark |
| NLC | [DPM.LOL NLC](https://dpm.lol/esport/leagues/NLC/2025/all/matches) | Secondary esports database source; historical purple NLC mark |
| VALORANT Balkan League | [VLR event series](https://www.vlr.gg/series/29/valorant-balkan-league) | Secondary esports database source; Season 3 mark |
| VALORANT East Surge | [VLR historical event](https://www.vlr.gg/event/1422/challengers-league-east-surge-split-1/regular-season) | Historical Surge mark; no substitution with its later replacement brand |

Direct asset URLs, hashes and original byte sizes: `logos/sourced/sources.json`, `extra-sources.json`, `final-sources.json`. Download errors are recorded alongside successes. Gamers United was subsequently obtained through browser page assets; its source manifest is `logos/sourced/gamers-united-browser-source.json`. Riot ZIP members are read by exact filename; archive paths are not blindly extracted. SVG files are screened for active/external content and rasterised with Sharp. `scripts/prepare-logos.mjs` generates the public files and `review/logos-contact-sheet.png`.

## Names retained without a logo

| Credit | Remaining gap |
| --- | --- |
| Gamers Lounge | Greek website returned HTTP 500; similarly named overseas businesses are unrelated. Need the Greek organisation's original or brand-kit URL. |
| All For One Charity Tournament | Results did not establish the exact tournament in this portfolio. |
| Sarissa Scouting Grounds | No sufficiently attributable logo located. |
| ANT1 Esports | [Official esports page](https://www.ant1live.com/esports) now verified and linked from the main portfolio roadmap. No separate tournament logo acquired; generic TV-channel branding is not substituted. |
| TFT Balkan Clash | Exact tournament/logo association not verified. |
| Trinity Cup Series | Cyprus event context located; organiser listing could not be fetched. Supplied footage stays visible, credit remains text. |
| TFT: Counters Competition Invitational | Exact tournament/logo association not verified. |
| Nero Tournament | Name is ambiguous; unrelated player/team search results rejected. |
| CS2 Team Paradox | Multiple teams use this name; exact team branding not established. |

No logo was recreated or guessed for these entries. They can be added without changing the layout when originals or exact organiser links become available.

## Greek Legends division-logo follow-up

The user identified separate Leaguepedia competition logos. GL2D's infobox links to `GL2Dlogo.png`; its full-resolution CDN response was downloaded as WebP, with the source URL and SHA-256 recorded in `logos/sourced/leaguepedia-sources.json`. The displayed derivative is `public/logos/greek-legends-2nd-division.png`. No current HCC replacement branding was substituted for the historical credit.

The user subsequently supplied `logos/GLAL_LOGO.png`, the dedicated Amateur League mark. It replaces the generic Greek Legends fallback in the moving credits and English/Greek roadmap. The source file remains unchanged; the site displays it in black using a CSS filter. The specific Leaguepedia page for the Amateur League remains unresolved, so the existing outbound credit link is still labelled as a Greek Legends overview.

## Outbound links

`content/brand-links.ts` holds the shared logo-link destinations. Brand tiles and game logos link to official sites or the previously researched historical competition references. Roadmap logos and titles use the credit's main URL, or its first labelled reference (Prime for HESF). The Amateur League reference is clearly named as a Greek Legends overview while its specific page is unresolved. Existing social, booking and event-reference links remain available. Unknown identities receive no guessed destination.
