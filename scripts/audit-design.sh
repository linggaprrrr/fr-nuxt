#!/usr/bin/env bash
# Advisory design-system audit — not wired to CI (there is none in this repo yet).
# Run manually with `npm run audit:design`. Prints findings; a nonzero exit means
# something was found, but every hit needs a human read — some are legitimate
# exceptions (e.g. a categorical color array differentiating canvas slots), not
# regressions. See DESIGN_SPEC.md and DESIGN_SYSTEM.md for the rules this checks.
set -uo pipefail
cd "$(dirname "$0")/.."

hits=0

echo "== label+placeholder collisions (VTextField/VSelect/VAutocomplete/VTextarea/VCombobox/VFileInput) =="
found=$(perl -0777 -ne '
  while (/<V(TextField|Select|Autocomplete|Textarea|Combobox|FileInput)\b((?:"[^"]*"|'"'"'[^'"'"']*'"'"'|[^>"'"'"'])*?)(\s*\/?>)/gs) {
    print "$ARGV: found\n" if $2 =~ /\blabel=/ && $2 =~ /\bplaceholder=/;
  }
' pages/**/*.vue components/**/*.vue 2>/dev/null)
if [ -n "$found" ]; then echo "$found"; hits=$((hits+1)); else echo "  none"; fi

echo
echo "== redundant density=\"compact\" / variant=\"outlined\" on the 6 field types (already the default) =="
found=$(grep -rEn '<V(TextField|Select|Autocomplete|Textarea|Combobox|FileInput)\b[^>]*(density="compact"|variant="outlined")' pages components --include="*.vue" 2>/dev/null)
if [ -n "$found" ]; then echo "$found"; hits=$((hits+1)); else echo "  none"; fi

echo
echo "== hardcoded hex in template style= attributes (pages/components) =="
echo "   -- eyeball each hit: a categorical color array (e.g. slot differentiation)"
echo "      or a user-configurable brand-color default is NOT a violation."
found=$(grep -rEon 'style="[^"]*#[0-9a-fA-F]{3,6}[^"]*"' pages components --include="*.vue" 2>/dev/null)
if [ -n "$found" ]; then echo "$found"; hits=$((hits+1)); else echo "  none"; fi

echo
[ "$hits" -eq 0 ] && echo "Clean." || echo "$hits check(s) found something — review above."
exit $hits
