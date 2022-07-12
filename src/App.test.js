import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

const setup = () => {
  const utils = render(<App />);
  const inputName = screen.getByTestId("name");
  const inputJobTitle = screen.getByTestId("job-title");
  const inputPhoneNumber = screen.getByTestId("phone-number");
  const inputEmail = screen.getByTestId("email");
  const inputPhotoUrl = screen.getByTestId("photourl");
  const inputFarewell = screen.getByTestId("farewell");

  const labelName = screen.getByTestId("label-name");
  const labelJobTitle = screen.getByTestId("label-jobTitle");
  const labelPhoneNumber = screen.getByTestId("label-phoneNumber");
  const labelEmail = screen.getByTestId("label-email");
  const labelFarewell = screen.getByTestId("label-farewell");

  return {
    inputFarewell,
    inputName,
    inputJobTitle,
    inputPhoneNumber,
    inputEmail,
    inputPhotoUrl,
    labelName,
    labelJobTitle,
    labelPhoneNumber,
    labelEmail,
    labelFarewell,

    ...utils,
  };
};

test("It should be empty", () => {
  const { inputName, inputJobTitle, inputPhoneNumber, inputEmail } = setup();

  expect(inputName.value).toBe("");
  expect(inputJobTitle.value).toBe("");
  expect(inputPhoneNumber.value).toBe("");
  expect(inputEmail.value).toBe("");
});

test("It should have a default farewell", () => {
  const { inputFarewell } = setup();

  expect(inputFarewell.value).toBe(
    "Mit freundlichen Grüßen aus Stuttgart/ Best Regards"
  );
});

test("It should change label farewell", () => {
  const { inputFarewell, labelFarewell } = setup();

  fireEvent.change(inputFarewell, { target: { value: "rui" } });

  expect(inputFarewell.value).toBe(labelFarewell.textContent);
});

test("It should change label name", () => {
  const { inputName, labelName } = setup();

  fireEvent.change(inputName, { target: { value: "rui" } });

  expect(inputName.value).toBe(labelName.textContent);
});

test("It should change label job title", () => {
  const { inputJobTitle, labelJobTitle } = setup();

  fireEvent.change(inputJobTitle, { target: { value: "head of" } });

  expect(inputJobTitle.value).toBe(labelJobTitle.textContent);
});

test("It should change label phone number", () => {
  const { inputPhoneNumber, labelPhoneNumber } = setup();

  fireEvent.change(inputPhoneNumber, { target: { value: "123" } });

  expect(inputPhoneNumber.value).toBe(labelPhoneNumber.textContent);
});

test("It should change label email", () => {
  const { inputEmail, labelEmail } = setup();

  fireEvent.change(inputEmail, { target: { value: "email@laserhub.com" } });

  expect(inputEmail.value).toBe(labelEmail.textContent);
});

test("Invalid URL - It should not change the default avatar", () => {
  const { inputPhotoUrl } = setup();

  fireEvent.change(inputPhotoUrl, { target: { value: "1" } });

  var photoDefault = screen.getByTestId("photo-default");

  expect(photoDefault).toBeInTheDocument();
});

test("Incomplete URL - It should not change the default avatar", () => {
  const { inputPhotoUrl } = setup();

  fireEvent.change(inputPhotoUrl, {
    target: { value: "https://drive.google.com/file/d/" },
  });

  var photoDefault = screen.getByTestId("photo-default");

  expect(photoDefault).toBeInTheDocument();
});

test("Empty URL - It should not change the default avatar", () => {
  const { inputPhotoUrl } = setup();

  fireEvent.change(inputPhotoUrl, { target: { value: "" } });

  var photoDefault = screen.getByTestId("photo-default");

  expect(photoDefault).toBeInTheDocument();
});

test("No GDrive URL - It should not change the default avatar", () => {
  const { inputPhotoUrl } = setup();

  fireEvent.change(inputPhotoUrl, {
    target: { value: "https://google.com/file/" },
  });

  var photoDefault = screen.getByTestId("photo-default");

  expect(photoDefault).toBeInTheDocument();
});

test("It should change to the GDrive View URL", () => {
  const { inputPhotoUrl } = setup();

  fireEvent.change(inputPhotoUrl, {
    target: {
      value:
        "https://drive.google.com/file/d/1P-CVlDsTmuj_ohExbqzoRct0YgV6khww/view",
    },
  });

  var photo = screen.getByTestId("photo");

  expect(photo).toHaveAttribute(
    "src",
    "https://drive.google.com/uc?export=view&id=1P-CVlDsTmuj_ohExbqzoRct0YgV6khww"
  );
});
