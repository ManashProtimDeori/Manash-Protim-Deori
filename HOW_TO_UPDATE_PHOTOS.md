# How to update portraits and professional photos

The public site does not expose a fake browser upload control. Images are repository-managed so the portfolio remains deterministic and free to host.

## Main portrait
Place a real professional portrait at:

`public/images/profile/profile-main.jpg`

Recommended:
- 1600 × 2000
- 4:5 aspect ratio
- under ~1 MB when possible

## About portrait
Place a second real photograph at:

`public/images/profile/profile-about.jpg`

Recommended:
- 1600 × 2000
- 4:5 aspect ratio

## Professional events
Place images in:

`public/images/events/`

Supported prepared slots:
- event-01.jpg
- event-02.jpg
- event-03.jpg
- event-04.jpg
- event-05.jpg
- event-06.jpg

Then edit:

`src/data/personalMedia.ts`

For each real event, set:
- `enabled: true`
- `title`
- `date`
- `location`
- `context`
- `alt`

Use only factual context. Do not claim speaking, organizing, representing a company or winning an award unless that is true.

## Crop control
Portrait focal points are configured through `objectPosition` in `src/data/personalMedia.ts`.
