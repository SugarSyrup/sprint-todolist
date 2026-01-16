"use client";

export function GNB() {
  function navigateRoot() {
    window.location.href = "/";
  }

  return (
    <header className="w-full h-[60px] flex flex-row justify-start items-center pl-[24px] lg:pl-[360px]">
      <picture>
        <source media="(min-width: 768px)" srcSet="/icons/logo-large.svg" />
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
