import "./App.css";
import { useState, Fragment } from "react";
import { MailIcon, ExclamationCircleIcon } from "@heroicons/react/solid";

import React from "react";

import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";

export default function App() {
  const [name, setName] = useState("John Doe");
  const [jobTitle, setJobTitle] = useState("Head of Laserhub");
  const [phoneNumber, setPhoneNumber] = useState("+49 (0)711 89989-371");
  const [email, setEmail] = useState("youremail@laserhub.com");

  const [selectedImageUrl, setSelectedImageUrl] = useState();
  const [imageURLErrorMessage, setimageURLErrorMessage] = useState("");
  const [showItemCopiedToClipboard, setShowItemCopiedToClipboard] =
    useState(false);

  const [useMarketingImageUrl, setUseMarketingImageUrl] = useState(false);
  const [selectedMarketingImageUrl, setSelectedMarketingImageUrl] = useState(
    "https://laserhub.com/images/email/Messen-2022-1.png"
  );

  const divRef = React.useRef();

  function onChangeName(event) {
    setName(event.target.value);
  }

  function onChangeJobTitle(event) {
    setJobTitle(event.target.value);
  }

  function onChangePhoneNumber(event) {
    setPhoneNumber(event.target.value);
  }

  function onChangeEmail(event) {
    setEmail(event.target.value);
  }

  const regexGDriveImageURL = new RegExp(/(\/[\w+-]+)/g);

  // Input: https://drive.google.com/file/d/1P-CVlDsTmuj_ohExbqzoRct0YgV6khww/view
  // Output: https://drive.google.com/uc?export=view&id=1P-CVlDsTmuj_ohExbqzoRct0YgV6khww
  function getGDriveUrlToViewPhoto(gdriveurl) {
    // Undefined
    if (!gdriveurl) {
      return "";
    }

    // Invalid URL - not GDrive
    if (gdriveurl.indexOf("https://drive.google.com") < 0) {
      return "";
    }

    var arrayOfUrlSlugs = gdriveurl.match(regexGDriveImageURL);

    // Invalid URL
    if (!arrayOfUrlSlugs) {
      return "";
    }

    // No suficient number of slugs
    if (arrayOfUrlSlugs.length < 4) {
      return "";
    }

    return (
      "https://drive.google.com/uc?export=view&id=" +
      arrayOfUrlSlugs[3].replace("/", "")
    );
  }

  function onChangePhotoURL(event) {
    var urlToViewTheGDriveImage = getGDriveUrlToViewPhoto(event.target.value);
    if (urlToViewTheGDriveImage) {
      setSelectedImageUrl(urlToViewTheGDriveImage);
      setimageURLErrorMessage("");
    } else {
      // error
      setSelectedImageUrl();
      setimageURLErrorMessage("error");
    }
  }

  function onChangeCheckBoxMarketingImageUrl(event) {
    setUseMarketingImageUrl(event.target.checked);

    if (event.target.checked) {
      setSelectedMarketingImageUrl(
        "https://laserhub.com/images/email/Messen-2022-1.png"
      );
    } else {
      // hide
    }
  }

  function onChangeMarketingImageUrl(event) {
    setSelectedMarketingImageUrl(event.target.value);
  }

  function onclickTest(event) {
    navigator.clipboard.writeText(divRef.current.innerHTML);
    setShowItemCopiedToClipboard(true);
  }

  return (
    <>
      <div>
        <div className="md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 ">
          <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                alt="Workflow"
              />
            </div>
            <div className="mt-5 flex-grow flex flex-col px-4 pt-5 pb-5">
              <div className="isolate -space-y-px rounded-md shadow-sm">
                <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                  <label
                    htmlFor="name"
                    className="block text-xs font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    data-testid="name"
                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="John Doe"
                    onChange={onChangeName}
                  />
                </div>
                <div className="relative border border-gray-300 rounded-md rounded-t-none rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                  <label
                    htmlFor="job-title"
                    className="block text-xs font-medium text-gray-900"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="job-title"
                    id="job-title"
                    data-testid="job-title"
                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="Head of Laserhub"
                    onChange={onChangeJobTitle}
                  />
                </div>
                <div className="relative border border-gray-300 rounded-md rounded-t-none rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                  <label
                    htmlFor="phone-number"
                    className="block text-xs font-medium text-gray-900"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone-number"
                    id="phone-number"
                    data-testid="phone-number"
                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="+49 (0)711 89989-371"
                    onChange={onChangePhoneNumber}
                  />
                </div>
                <div className="relative border border-gray-300 rounded-md rounded-t-none rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    data-testid="email"
                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="youremail@laserhub.com"
                    onChange={onChangeEmail}
                  />
                </div>
                <div className="relative border border-gray-300 rounded-md rounded-t-none rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                  <label
                    htmlFor="photo"
                    className="block text-xs font-medium text-gray-900"
                  >
                    GDrive Photo URL
                  </label>
                  <input
                    type="text"
                    name="photourl"
                    id="photourl"
                    data-testid="photourl"
                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="https://drive.google.com/"
                    onChange={onChangePhotoURL}
                  />
                  {imageURLErrorMessage && (
                    <div>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"></div>
                      <ExclamationCircleIcon
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                      <p className="mt-2 text-sm text-red-600" id="error">
                        Invalid GDrive URL
                      </p>
                    </div>
                  )}
                </div>
                <div className="relative border border-gray-300 rounded-md rounded-b rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                  <input
                    class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onChange={onChangeCheckBoxMarketingImageUrl}
                  />
                  <label
                    class="form-check-label text-xs inline-block text-gray-800"
                    for="flexCheckDefault"
                  >
                    Hubspot Image
                  </label>
                  <input
                    type="text"
                    name="marketingphotourl"
                    id="marketingphotourl"
                    data-testid="marketingphotourl"
                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="https://laserhub.com/images/email/Messen-2022-1.png"
                    onChange={onChangeMarketingImageUrl}
                    disabled={!useMarketingImageUrl}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 justify-center sm:px-6 md:px-8 bg-gray-100">
                <div className="preview_header outer dark justify-center">
                  <div className="dot red"></div>
                  <div className="dot amber"></div>
                  <div className="dot green"></div>
                </div>
                <div
                  ref={divRef}
                  className="preview_body border-x border-y border-gray-300 bg-white rounded-b h-80"
                >
                  <table
                    cellPadding="0"
                    width="100%"
                    cellSpacing="0"
                    style={{ backgroundColor: "#fff" }}
                  >
                    <tbody>
                      <tr>
                        <td>
                          <table
                            cellSpacing="0"
                            cellPadding="0"
                            border="0"
                            style={{
                              paddingTop: "20px",
                              paddingBottom: "20px",
                              lineHeight: "1.2",
                              fontSize: "16px",
                              fontFamily: "Helvetica",
                              color: "#000",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td>
                                  <p style={{ fontSize: "14px" }}>
                                    Mit freundlichen Gr&uuml;&szlig;en aus
                                    Stuttgart/ Best Regards
                                  </p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table
                            cellSpacing="0"
                            cellPadding="0"
                            border="0"
                            style={{
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              lineHeight: "1.2",
                              fontSize: "16px",
                              fontFamily: "Helvetica",
                              color: "#000",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td rowSpan="3">
                                  <div
                                    style={{
                                      height: "90px",
                                      width: "90px",
                                      marginTop: "10px",
                                      marginRight: "10px",
                                      marginBottom: "10px",
                                      marginLeft: "0",
                                    }}
                                  >
                                    {selectedImageUrl && (
                                      <div>
                                        <img
                                          src={selectedImageUrl}
                                          alt="thumbnail"
                                          style={{
                                            borderRadius: "100%",
                                            maxWidth: "80px",
                                            marginTop: "5px",
                                          }}
                                          data-testid="photo"
                                        />
                                      </div>
                                    )}

                                    {!selectedImageUrl && (
                                      <div>
                                        <svg
                                          className="h-full w-full text-gray-300"
                                          fill="currentColor"
                                          viewBox="0 0 24 24"
                                          style={{
                                            borderRadius: "100%",
                                            maxWidth: "80px",
                                            marginTop: "5px",
                                          }}
                                          data-testid="photo-default"
                                        >
                                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                      </div>
                                    )}
                                  </div>
                                </td>
                                <td style={{ paddingTop: "4px" }}>
                                  <span
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: "600",
                                      paddingRight: "5px",
                                      borderRight: "2px solid #f8d559",
                                    }}
                                    data-testid="label-name"
                                  >
                                    {name}
                                  </span>
                                  <span
                                    style={{ paddingLeft: "5px" }}
                                    data-testid="label-jobTitle"
                                  >
                                    {jobTitle}
                                  </span>
                                  <table
                                    cellSpacing="0"
                                    cellPadding="0"
                                    border="0"
                                    style={{
                                      paddingTop: "13px",
                                      lineHeight: "1.2",
                                      fontSize: "14px",
                                      fontFamily: "Helvetica",
                                      color: "#000",
                                    }}
                                  >
                                    <tbody>
                                      <tr>
                                        <td style={{ paddingRight: "10px" }}>
                                          <img
                                            width="18"
                                            src="https://laserhub.com/images/email/tel_icon.png"
                                            alt="aa"
                                          />
                                        </td>
                                        <td data-testid="label-phoneNumber">
                                          {phoneNumber}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{ paddingRight: "10px" }}>
                                          <img
                                            width="25"
                                            src="https://laserhub.com/images/email/mail_icon.png"
                                            alt="aa"
                                          />
                                        </td>
                                        <td>
                                          <a
                                            href={`mailto:${email}`}
                                            style={{
                                              color: "#000",
                                              textDecoration: "none",
                                            }}
                                            alt="aa"
                                            data-testid="label-email"
                                          >
                                            {email}
                                          </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table
                            cellSpacing="0"
                            cellPadding="0"
                            border="0"
                            style={{
                              fontSize: "12px",
                              lineHeight: "1.2",
                              fontFamily: "Helvetica",
                              color: "#888",
                            }}
                          >
                            <tbody>
                              {useMarketingImageUrl && (
                                <tr>
                                  <td
                                    colspan="2"
                                    style={{ paddingTop: "10px" }}
                                  >
                                    <img
                                      src={selectedMarketingImageUrl}
                                      alt=""
                                    />
                                  </td>
                                </tr>
                              )}
                              <tr>
                                <td>
                                  Laserhub GmbH | Neckarstra&szlig;e 189-191 |
                                  70190 Stuttgart
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Amtsgericht Stuttgart HRB 761903 | Ust-IdNr.
                                  DE313902667
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Gesch&auml;ftsf&uuml;hrung: Adrian Raidt,
                                  Christoph R&ouml;&szlig;ner, Jonas Schweizer
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="justify-center flex pt-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={onclickTest}
                  >
                    Copy HTML
                    <MailIcon
                      className="ml-3 -mr-1 h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div
          aria-live="assertive"
          className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
        >
          <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
            <Transition
              show={showItemCopiedToClipboard}
              as={Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon
                        className="h-6 w-6 text-green-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="text-sm font-medium text-gray-900">
                        Successfully copied!
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        The signature was copied to your clipboard!
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                      <button
                        type="button"
                        className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => {
                          setShowItemCopiedToClipboard(false);
                        }}
                      >
                        <span className="sr-only">Close</span>
                        <XIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </>
  );
}
