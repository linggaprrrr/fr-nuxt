<script setup lang="ts">
// A mock of the kiosk welcome screen, so branding can be judged before it is
// saved and a kiosk is restarted to find out. It renders the *pending* state —
// including files picked but not yet uploaded — because reviewing what is
// already live would defeat the point.
//
// Deliberately an approximation, not the real app: it borrows the layout and
// the three things branding actually controls (banner, background, primary
// colour). It is labelled as such in the UI so nobody treats a close-enough
// mock as pixel truth.
const props = defineProps<{
  bannerUrl: string | null
  backgroundUrl: string | null
  primaryColor: string
  outletName: string
  ctaPosition?: string
  ctaLabel?: string
}>()

// Mirrors BannerSplash's anchors in the kiosk. The picker is only useful if
// this shows the button where it will actually land — otherwise choosing a
// corner is guesswork.
const CTA_ANCHOR: Record<string, string> = {
  'top-left': 'align-start justify-start',
  'top-center': 'align-start justify-center',
  'top-right': 'align-start justify-end',
  'middle-left': 'align-center justify-start',
  'middle-center': 'align-center justify-center',
  'middle-right': 'align-center justify-end',
  'bottom-left': 'align-end justify-start',
  'bottom-center': 'align-end justify-center',
  'bottom-right': 'align-end justify-end',
}
const ctaAnchor = computed(() => CTA_ANCHOR[props.ctaPosition ?? ''] ?? CTA_ANCHOR['bottom-center'])

// The close button works here too, so the banner and the screen behind it can
// both be checked without saving and walking to a kiosk. Reset whenever the
// artwork changes, or picking a new file would land on a hidden banner and
// look like the upload failed.
const bannerHidden = ref(false)
watch(() => props.bannerUrl, () => { bannerHidden.value = false })

const STEPS = ['Pindai', 'Galeri', 'Edit', 'Keranjang', 'Unduh']
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-2">
      <span class="text-caption font-weight-bold text-medium-emphasis">
        Pratinjau layar sambutan
      </span>
      <span class="text-caption text-medium-emphasis">perkiraan tampilan</span>
    </div>

    <!-- 16:10, the shape of the kiosk screen. Scaled by width so it stays
         proportional in the modal instead of guessing a fixed height. -->
    <div
      class="kiosk-preview"
      :style="{
        '--kp-bg': backgroundUrl ? `url(${backgroundUrl})` : 'none',
        backgroundColor: backgroundUrl ? undefined : '#eef2f7',
      }"
    >
      <!-- The kiosk lays a shaped white scrim over the background so its dark
           text stays readable (see .app-bg in the kiosk's index.css). The
           preview has to reproduce it or it promises a vividness the kiosk
           will not deliver — which is exactly the surprise this preview exists
           to prevent. Kept in sync with that rule by hand; if one changes,
           change both. -->
      <div v-if="backgroundUrl" class="kp-scrim" />

      <!-- Header: step chips, tinted by the primary colour like the real app -->
      <div class="kp-header">
        <div class="kp-logo">Ownize</div>
        <div class="d-flex align-center" style="gap: 4px;">
          <template v-for="(s, i) in STEPS" :key="s">
            <span
              class="kp-step"
              :style="{
                background: i === 0 ? primaryColor : 'rgba(0,0,0,0.08)',
                color: i === 0 ? '#fff' : 'rgba(0,0,0,0.45)',
              }"
            >{{ i + 1 }}</span>
            <span class="kp-step-label">{{ s }}</span>
          </template>
        </div>
      </div>

      <!-- With a banner set the kiosk shows it as a card over the welcome
           screen, dimmed behind — so the preview keeps the app visible rather
           than blacking it out. -->
      <div v-if="bannerUrl && !bannerHidden" class="kp-overlay" @click="bannerHidden = true">
        <div class="kp-card" @click.stop>
          <img :src="bannerUrl" alt="" class="kp-card-img" >
          <button type="button" class="kp-splash-close" aria-label="Tutup banner" @click="bannerHidden = true">✕</button>
          <div class="kp-splash-cta d-flex" :class="ctaAnchor">
            <span class="kp-btn" :style="{ background: primaryColor }">{{ ctaLabel || 'Mulai' }}</span>
          </div>
        </div>
      </div>

      <button
        v-if="bannerUrl && bannerHidden"
        type="button"
        class="kp-reshow"
        @click="bannerHidden = false"
      >Lihat banner lagi</button>

      <div class="kp-body">
        <div class="kp-title" :style="{ color: primaryColor }">
          Temukan Foto Anda
        </div>

        <div class="kp-oval" :style="{ borderColor: primaryColor }" />

        <div class="kp-btn" :style="{ background: primaryColor }">
          Pindai Wajah Saya
        </div>
        <div class="kp-outlet">{{ outletName }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kiosk-preview {
  position: relative;
  isolation: isolate;
  width: 100%;
  aspect-ratio: 16 / 10;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* The blurred photo, scaled slightly so the blur cannot bleed a soft edge in
   at the sides — the same trick as body::before on the kiosk. */
.kiosk-preview::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image: var(--kp-bg, none);
  background-size: cover;
  background-position: center;
  filter: blur(2px) saturate(1.05);
  transform: scale(1.03);
}

/* Mirrors the kiosk: the photo is blurred (body::before there) and carries
   only a light wash, so colour survives without fighting the text. */
.kp-scrim {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.45);
  pointer-events: none;
}

.kp-header {
  position: relative;   /* above .kp-scrim */
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 10px;
  background: rgba(255, 255, 255, 0.92);
  flex: 0 0 auto;
}

.kp-logo { font-size: 11px; font-weight: 800; color: #0b3d64; }
.kp-step {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  font-size: 8px;
  font-weight: 700;
}
.kp-step-label { font-size: 8px; color: rgba(0, 0, 0, 0.45); margin-right: 4px; }

.kp-body {
  position: relative;   /* above .kp-scrim */
  z-index: 1;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  min-height: 0;
}

/* A dimmed layer over the app with the banner as a card — the app stays
   visible behind, which is the point of it not being a takeover. */
.kp-overlay {
  position: absolute; inset: 0; z-index: 2;
  background: rgba(0, 0, 0, 0.55);
  display: flex; align-items: center; justify-content: center;
  padding: 14px;
}
.kp-card {
  position: relative;
  display: inline-block;
  max-width: 78%;
  max-height: 82%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 6px 22px rgba(0, 0, 0, 0.45);
}
/* Shrink-to-fit so the card takes the banner's own shape, as on the kiosk. */
.kp-card-img { display: block; max-width: 100%; max-height: 100%; width: auto; height: auto; }
.kp-splash-close {
  position: absolute; top: 4px; right: 4px;
  width: 18px; height: 18px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 9px; color: #fff;
  background: rgba(0,0,0,0.45); border: 1px solid rgba(255,255,255,0.5);
}
.kp-splash-cta { position: absolute; inset: 0; padding: 12px; }
.kp-title { font-size: 18px; font-weight: 800; }

.kp-oval {
  width: 68px;
  height: 88px;
  border: 2px dashed;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.55);
}

.kp-btn {
  padding: 5px 16px;
  border-radius: 999px;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
}

.kp-outlet { font-size: 8px; color: rgba(0, 0, 0, 0.45); }

.kp-splash-close { cursor: pointer; padding: 0; }
.kp-reshow {
  position: absolute;
  top: 28px;
  right: 6px;
  z-index: 3;
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 9px;
  font-weight: 600;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  border: none;
}
</style>
