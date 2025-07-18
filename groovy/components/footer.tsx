export const Footer = () => {
  return (
    <footer className="bg-gray-50">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div className="md:flex md:justify-between">
              <div className="mb-6 md:mb-0">
                  <a href="https://flowbite.com/" className="flex items-center gap-1">
                    <svg width="24" height="24" viewBox="0 0 113 124" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.83559 92.2684C-1.49188 84.8824 0.987592 75.3867 8.37364 71.0592L88.9742 23.8355C96.3603 19.508 105.856 21.9875 110.183 29.3736C114.511 36.7596 112.031 46.2553 104.645 50.5828L24.0448 97.8065C16.6587 102.134 7.16306 99.6544 2.83559 92.2684Z" fill="url(#paint0_linear_7_43)" fillOpacity="0.4"/>
                      <path d="M2.72822 29.5576C7.03037 22.1568 16.5175 19.6448 23.9183 23.947L104.68 70.8943C112.081 75.1965 114.593 84.6836 110.291 92.0844C105.989 99.4853 96.5015 101.997 89.1007 97.6951L8.33886 50.7477C0.938036 46.4456 -1.57393 36.9584 2.72822 29.5576Z" fill="url(#paint1_linear_7_43)" fillOpacity="0.4"/>
                      <path d="M72 15.5C72 24.0604 65.0604 31 56.5 31C47.9396 31 41 24.0604 41 15.5C41 6.93959 47.9396 0 56.5 0C65.0604 0 72 6.93959 72 15.5Z" fill="#4339F7"/>
                      <path d="M113 36.5C113 45.0604 106.06 52 97.5 52C88.9396 52 82 45.0604 82 36.5C82 27.9396 88.9396 21 97.5 21C106.06 21 113 27.9396 113 36.5Z" fill="#58A5EF"/>
                      <path d="M112 84.5C112 93.0604 105.06 100 96.5 100C87.9396 100 81 93.0604 81 84.5C81 75.9396 87.9396 69 96.5 69C105.06 69 112 75.9396 112 84.5Z" fill="#FF2F96"/>
                      <path d="M72 108.5C72 117.06 65.0604 124 56.5 124C47.9396 124 41 117.06 41 108.5C41 99.9396 47.9396 93 56.5 93C65.0604 93 72 99.9396 72 108.5Z" fill="#FE8253"/>
                      <path d="M32 84.5C32 93.0604 25.0604 100 16.5 100C7.93959 100 1 93.0604 1 84.5C1 75.9396 7.93959 69 16.5 69C25.0604 69 32 75.9396 32 84.5Z" fill="#009480"/>
                      <path d="M31 36.5C31 45.0604 24.0604 52 15.5 52C6.93959 52 0 45.0604 0 36.5C0 27.9396 6.93959 21 15.5 21C24.0604 21 31 27.9396 31 36.5Z" fill="#8927F5"/>
                      <defs>
                      <linearGradient id="paint0_linear_7_43" x1="0" y1="62" x2="113" y2="62" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#009480"/>
                      <stop offset="1" stopColor="#58A5EF"/>
                      </linearGradient>
                      <linearGradient id="paint1_linear_7_43" x1="0" y1="62" x2="113" y2="62" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#8927F5"/>
                      <stop offset="1" stopColor="#FF2F96"/>
                      </linearGradient>
                      </defs>
                    </svg>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">Groove Nomad</span>
                  </a>
              </div>
              <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                  <div>
                      <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Ressources</h2>
                      <ul className="text-gray-500 font-medium">
                          <li className="mb-4">
                              <a href="https://flowbite.com/" className="hover:underline">Flowbite</a>
                          </li>
                          <li>
                              <a href="https://tailwindcss.com/" className="hover:underline">Tailwind CSS</a>
                          </li>
                      </ul>
                  </div>
                  <div>
                      <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Suivez-nous</h2>
                      <ul className="text-gray-500 font-medium">
                          <li className="mb-4">
                              <a href="https://github.com/themesberg/flowbite" className="hover:underline ">Github</a>
                          </li>
                          <li>
                              <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Discord</a>
                          </li>
                      </ul>
                  </div>
                  <div>
                      <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Mentions légales</h2>
                      <ul className="text-gray-500 font-medium">
                          <li className="mb-4">
                              <a href="#" className="hover:underline">Politique de confidentialité</a>
                          </li>
                          <li>
                              <a href="#" className="hover:underline">Conditions d'utilisation</a>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
              <span className="text-sm text-gray-500 sm:text-center">© 2025 <a href="#" className="hover:underline">Groove Nomad</a>. Tous droits réservés.
              </span>
              <div className="flex mt-4 sm:justify-center sm:mt-0">
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                        <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd"/>
                      </svg>
                      <span className="sr-only">Facebook</span>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-900 ms-5">
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                            <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"/>
                        </svg>
                      <span className="sr-only">Discord community</span>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-900 ms-5">
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                        <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd"/>
                    </svg>
                      <span className="sr-only">Twitter</span>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-900 ms-5">
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd"/>
                      </svg>
                      <span className="sr-only">GitHub</span>
                  </a>
              </div>
          </div>
        </div>
    </footer>
  );
};