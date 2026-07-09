#!/bin/bash
set -euo pipefail
export PATH="$HOME/.local/node/bin:$PATH"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Load environment variables
set -a; source "$DIR/.env"; set +a
echo "Building..."
( cd "$DIR/site" && rm -rf node_modules/.astro .astro dist && npx astro build )
echo "Deploying..."
netlify deploy --prod --dir="$DIR/site/dist" --site="${SITE_ID}"
echo "\u2713 Live: https://bubblelime-everybody-moves.netlify.app"
