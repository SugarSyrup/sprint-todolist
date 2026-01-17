// Global Navigation Bar

"use client";

export function GNB() {
  function navigateRoot() {
    window.location.href = "/";
  }

  return (
    <header className="w-full h-[60px] bg-white border-[1px] border-slate-200 flex flex-row justify-start items-center pl-[16px] sm:pl-[24px] lg:pl-[360px]">
      <picture>
        <source media="(min-width: 640px)" srcSet="/icons/logo-large.svg" />
        <img
          src="/icons/logo-small.svg"
          alt="logo"
          className="h-[40px]"
          onClick={navigateRoot}
        />
      </picture>
    </header>
  );
}
