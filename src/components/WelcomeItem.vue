<template>
  <div class="item">
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <div>
        <slot name="heading"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
