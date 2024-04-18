function NavBar() {
  return (
    <header className="mb-1 px-4 shadow">
      <div className="relative mx-12  flex max-w-screen-lg flex-col py-2 sm:flex-row sm:items-center sm:justify-between">
        <a className="flex items-center text-3xl font-normal " href="/">
          <span className="mr-2 text-3xl text-blue-600 "
          >
            <img src="logo.png" title="image" height={42} width={42} />
          </span>
          <span >PanCam</span>
        </a>
      </div>
    </header>
  );
}

export default NavBar