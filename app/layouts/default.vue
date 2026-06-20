<template>
  <div class="layout">
    <AppHeader />
    <main class="layout__main">
      <slot />
    </main>
    <AppFooter />

    <AppSuccessModal />
    <AppErrorModal />
  </div>
</template>
