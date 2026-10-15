#!/usr/bin/env bash
set -euo pipefail

ui=${1:-$HOME/ytteria-ui}
dest=src/lib/ui

[ -d "$ui/tokens" ] || {
	echo "not a ytteria-ui checkout: $ui" >&2
	exit 1
}

mkdir -p "$dest"
for f in tokens/tokens.css components/base.css; do
	out="$dest/$(basename "$f")"
	cp "$ui/$f" "$out"
	echo "synced $out (generated from ytteria-ui; edit there, not here)"
done

cp "$ui/brand/ytteria/mark.svg" static/logo.svg
cp "$ui/brand/ytteria/icons/favicon.svg" static/favicon.svg
cp "$ui/brand/ytteria/icons/favicon.ico" static/favicon.ico
cp "$ui/brand/ytteria/icons/apple-touch-icon.png" static/apple-touch-icon.png
cp "$ui/brand/ytteria/icons/icon-512.png" static/icon-512.png
echo "synced brand assets into static/"

for mode_hex in "light:$(grep -A3 '^:root' "$ui/tokens/tokens.css" | grep -o '\--paper: *#[0-9a-f]*' | head -1 | grep -o '#[0-9a-f]*')" \
	"dark:$(grep -A3 "data-theme='dark'" "$ui/tokens/tokens.css" | grep -o '\--paper: *#[0-9a-f]*' | head -1 | grep -o '#[0-9a-f]*')"; do
	hex=${mode_hex#*:}
	grep -qi "content=\"$hex\"" src/app.html || {
		echo "theme-color in src/app.html does not match --paper ($mode_hex)" >&2
		exit 1
	}
	grep -qi -- "--paper: *$hex" static/404.html || {
		echo "--paper in static/404.html does not match the tokens ($mode_hex)" >&2
		exit 1
	}
done

for token in ink ink-muted accent; do
	for mode in ':root' "data-theme='dark'"; do
		hex=$(grep -A14 "$mode" "$ui/tokens/tokens.css" | grep -o -- "--$token: *#[0-9a-f]*" | head -1 | grep -o '#[0-9a-f]*')
		[ -n "$hex" ] || continue
		grep -qi -- "--$token: *$hex" static/404.html || {
			echo "--$token in static/404.html does not match the tokens ($mode $hex)" >&2
			exit 1
		}
	done
done
echo "theme-color and 404 palette match tokens"
