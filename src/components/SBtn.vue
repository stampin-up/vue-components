<template>
  <VBtn
    v-bind="$attrs"
    :class="{
      'action-button': action,
      'link--small': linkSmall,
      'link--medium': linkMedium,
      'link--large': linkLarge,
      'link': isText,
    }"
    :text="isText"
    :nuxt="isLink"
    :to="to"
    v-on="$listeners"
  >
    <slot />
  </VBtn>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({
  inheritAttrs: false
})
export default class SBtn extends Vue {
  @Prop({ required: false, default: false, type: Boolean }) action!: boolean
  @Prop({ required: false, default: false, type: Boolean }) linkSmall!: boolean
  @Prop({ required: false, default: false, type: Boolean }) linkMedium!: boolean
  @Prop({ required: false, default: false, type: Boolean }) linkLarge!: boolean
  @Prop({ required: false, type: [String, Object] }) to?: string | object

  get isLink () {
    return !!this.to
  }

  get isText () {
    return this.linkSmall || this.linkLarge || this.linkMedium || this.$attrs.text
  }
}
</script>

<style lang="scss" scoped>
.action-button {
  font-weight : 900 !important;
  text-transform : uppercase !important;
  color: var(--v-primary-base);
  box-shadow: none;

  &.black-button {
    border-radius: 0 !important;
    background-color: var(--v-primary-base) !important;
    color: white !important;
  }
  &.translucent {
    background-color: white !important;
    color: var(--v-primary-base) !important;
    opacity: 0.75;
    &:hover {
      background-color: var(--v-hover-base) !important;
    }
  }
  &.small {
    height: 46px !important;
  }
  @media #{map-get($display-breakpoints, 'sm-and-up')} {
    &:hover { background-color: var(--v-hover-base) !important; }
  }
  &.secondary:hover { background-color: #a00041 !important; }
}

.link--small {
  font-size:  0.8571rem !important;
}

.link--medium {
  font-size:  1rem !important;
}

.link--large {
  font-size: 1.143rem !important;
}

.link {
  text-transform: uppercase;
  text-decoration: underline !important;
}

@media #{map-get($display-breakpoints, 'md-and-up')}  {
  .action-button {
    font-size: map-get($font-sizes, 18) !important;
    height: 50px !important;
  }
}

@media #{map-get($display-breakpoints, 'sm-and-down')}  {
  .action-button {
    font-size:  map-get($font-sizes, 16) !important;
    height: 42px !important;
  }
}

.secondary-button {
  &:hover { background-color: var(--v-hover-base) !important; }
}

</style>
