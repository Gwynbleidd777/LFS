import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";

// ... (previous code)

const AddItem = () => {
  const [cloudinaryImageUrl, setCloudinaryImageUrl] = useState(null);
  const [inputData, setInputData] = useState({
    itemName: "",
    category: "",
    description: "",
    location: "",
    image: "",
    brand: "", // Add these fields
    model: "", // Add these fields
    color: "", // Add these fields
    ram: "", // Add these fields
    rom: "", // Add these fields
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [additionalImages, setAdditionalImages] = useState(Array(4).fill(null));
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);
  const [additionalImageNames, setAdditionalImageNames] = useState(
    Array(4).fill("")
  );

  // Additional fields based on categories
  const [color, setColor] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [cardType, setCardType] = useState("");

  const categoryOptions = [
    { value: "Watch", label: "Watch" },
    { value: "Purse/Money Bag", label: "Purse/Money Bag" },
    { value: "Cards", label: "Cards" },
    { value: "Phone", label: "Phone" },
    { value: "Phone Cover", label: "Phone Cover" },
    { value: "Earphones", label: "Earphones" },
    { value: "Books", label: "Books" },
    {
      value: "Keyboard/Mouse/Charger/Other Similar Gadgets",
      label: "Keyboard/Mouse/Charger/Other Similar Gadgets",
    },
    {
      value: "Glasses/Spectacles/Goggles",
      label: "Glasses/Spectacles/Goggles",
    },
    { value: "Speakers", label: "Speakers" },
    { value: "Lunch Box/Bottle", label: "Lunch Box/Bottle" },
    {
      value: "Pen Drive/USB/Similar Gadgets",
      label: "Pen Drive/USB/Similar Gadgets",
    },
    { value: "Make-Up Kit", label: "Make-Up Kit" },
    {
      value: "Jewellery/Chains/Rings/Similar Items",
      label: "Jewellery/Chains/Rings/Similar Items",
    },
    { value: "Outfit", label: "Outfit" },
    { value: "Others", label: "Others" },
  ];

  const typeOptions1 = [
    { value: "Lost", label: "Lost" },
    { value: "Found", label: "Found" },
  ];

  const typeOptions2 = [
    { value: "Analog", label: "Analog" },
    { value: "Digital", label: "Digital" },
  ];

  const debitCreditOptions = [
    { value: "Debit", label: "Debit" },
    { value: "Credit", label: "Credit" },
  ];

  const ramOptions = [
    "1 GB",
    "2 GB",
    "3 GB",
    "4 GB",
    "6 GB",
    "8 GB",
    "12 GB",
    "16 GB",
    "18 GB",
    "24 GB",
  ];

  const romOptions = [
    "4 GB",
    "32 GB",
    "64 GB",
    "128 GB",
    "256 GB",
    "512 GB",
    "1 TB",
  ];

  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const setCategoryValue = (selectedCategory) => {
    setInputData({ ...inputData, category: selectedCategory.value });
  };

  const setProfile = async (e) => {
    const file = e.target.files[0];
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);

    if (file) {
      setImage(file);
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          "http://localhost:8080/api/upload",
          formData
        );
        console.log("Local Image Path:", response.data.imagePath);
        setCloudinaryImageUrl(response.data.imagePath); // Update state with the local image path
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle the error condition (e.g., show error message)
      }
    }
  };

  useEffect(() => {
    // Check if cloudinaryImageUrl is not null and other required fields are present
    if (
      cloudinaryImageUrl &&
      inputData.itemName &&
      inputData.category &&
      inputData.description &&
      inputData.location
    ) {
      submitItemData();
    }
  }, [cloudinaryImageUrl, inputData]);

  const submitItemData = async () => {
    // Use the latest value of cloudinaryImageUrl
    const itemData = {
      itemName: inputData.itemName,
      category: inputData.category,
      description: inputData.description,
      location: inputData.location,
      image: cloudinaryImageUrl,
      color,
      model,
      brand,
      type,
      cardType,
    };

    try {
      // Send a POST request to your backend API endpoint for item registration
      const response = await axios.post(
        "http://localhost:8080/api/items", // Update the URL to your item registration endpoint
        itemData
      );

      // Handle success, e.g., show a success message
      toast.success("Item has been successfully added.");

      // Reset the input data
      setInputData({
        itemName: "",
        category: "",
        description: "",
        location: "",
        brand: "",
        model: "",
        color: "",
        ram: "",
        rom: "",
      });
      setCloudinaryImageUrl(null);

      // Clear the image and reset file input
      setImage(null);
      setPreview(null);
      fileInputRef.current.value = "";

      // ... (handle any other state resets or redirects as needed)
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Item submission failed:", error.message);
      toast.error("Item submission failed. Please try again.");
    }
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const setAdditionalImage = (e, index) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedPreviews = [...additionalImagePreviews];
        updatedPreviews[index] = reader.result;
        setAdditionalImagePreviews(updatedPreviews);
      };

      reader.readAsDataURL(file);

      const updatedImages = [...additionalImages];
      updatedImages[index] = file;
      setAdditionalImages(updatedImages);

      // Update the file name
      const updatedNames = [...additionalImageNames];
      updatedNames[index] = file.name;
      setAdditionalImageNames(updatedNames);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-1">Add Lost Or Found Item</h2>
      <Card className="shadow mt-3 p-3">
        <Form>
          {/* Basic Details section */}
          <div className="basic-details-section">
            <h3 className="text-center">Basic Details</h3>
            <Row>
              <Form.Group className="mb-3 col-lg-6" controlId="formItemName">
                <Form.Label>
                  Item Name<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="itemName"
                  value={inputData.itemName}
                  onChange={setInputValue}
                  placeholder="Enter Item Name"
                />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formCategory">
                <Form.Label>
                  Category<span className="text-danger">*</span>
                </Form.Label>
                <Select
                  options={categoryOptions}
                  value={categoryOptions.find(
                    (option) => option.value === inputData.category
                  )}
                  onChange={setCategoryValue}
                  placeholder="Select Category"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>
                  Description<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={inputData.description}
                  onChange={setInputValue}
                  placeholder="Enter Item Description"
                />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formLocation">
                <Form.Label>
                  Item Lost / Found Location
                  <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={inputData.location}
                  onChange={setInputValue}
                  placeholder="Enter Location"
                />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formItemType">
                <Form.Label className="d-block">
                  Item Type<span className="text-danger">*</span>
                </Form.Label>
                <Select
                  options={typeOptions1}
                  value={typeOptions1.find(
                    (option) => option.value === inputData.itemType
                  )}
                  onChange={(value) =>
                    setInputData({ ...inputData, itemType: value.value })
                  }
                  placeholder="Select Item Type"
                />
              </Form.Group>

              <Form encType="multipart/form-data">
                <Form.Group className="mb-3 col-lg-6" controlId="formItemImage">
                  <Form.Label>
                    Item Image<span className="text-danger">*</span>
                  </Form.Label>
                  <div className="image-upload-container">
                    <Form.Control
                      type="file"
                      name="image"
                      onChange={(e) => setProfile(e)} // Update onChange handler
                      ref={fileInputRef} // Assign the ref to the file input
                    />
                    {preview && ( // Check for preview instead of image
                      <div className="image-preview-box">
                        <h4>Image Preview</h4>
                        <div className="image-preview-container">
                          <img
                            src={preview}
                            alt="Item Preview"
                            className="image-preview"
                          />
                        </div>
                        <button
                          type="button"
                          className="remove-item-button"
                          onClick={() => {
                            setImage(null);
                            setPreview(null);
                            // Clear the value of the file input using the ref
                            fileInputRef.current.value = "";
                          }}
                        >
                          Remove Image
                        </button>
                      </div>
                    )}
                  </div>
                </Form.Group>
              </Form>
            </Row>
          </div>
          {inputData.category /* Check if a category is selected */ && (
            <hr className="divider" /> /* Add a divider when a category is selected */
          )}

          {/* Watch Section Additional Details */}

          {inputData.category === "Watch" && (
            <div className="additional-details-section">
              <h3 className="text-center">Additional Details</h3>
              <Row>
                <Form.Group className="mb-3 col-lg-6" controlId="formColor">
                  <Form.Label>Color (If Any)</Form.Label>
                  <Form.Control
                    type="text"
                    name="color"
                    value={inputData.color}
                    onChange={setInputValue}
                    placeholder="Enter Color"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formModel">
                  <Form.Label>Model (If Any)</Form.Label>
                  <Form.Control
                    type="text"
                    name="model"
                    value={inputData.model}
                    onChange={setInputValue}
                    placeholder="Enter Model"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formBrand">
                  <Form.Label>Brand (If Any)</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={inputData.brand}
                    onChange={setInputValue}
                    placeholder="Enter Brand"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formType">
                  <Form.Label>Type</Form.Label>
                  <Select
                    options={[
                      { value: "Analog", label: "Analog" },
                      { value: "Digital", label: "Digital" },
                    ]}
                    value={typeOptions2.find(
                      (option) => option.value === inputData.type
                    )}
                    onChange={(value) =>
                      setInputData({ ...inputData, type: value.value })
                    }
                    placeholder="Select Type"
                  />
                </Form.Group>

                {additionalImages.map((image, index) => (
                  <Form.Group
                    key={index}
                    className="mb-3 col-lg-6"
                    controlId={`formAdditionalImage${index + 1}`}
                  >
                    <Form.Label>Additional Image {index + 1}</Form.Label>
                    <div className="image-upload-container">
                      <Form.Control
                        type="file"
                        onChange={(e) => setAdditionalImage(e, index)}
                        ref={(ref) => (fileInputRef.current[index] = ref)}
                      />
                      {additionalImagePreviews[index] && (
                        <div className="image-preview-box">
                          <h4>Image Preview</h4>
                          <div className="image-preview-container">
                            <img
                              src={additionalImagePreviews[index]}
                              alt={`Additional Image ${index + 1}`}
                              className="image-preview"
                            />
                          </div>
                          <button
                            type="button"
                            className="remove-item-button"
                            onClick={() => {
                              const updatedImages = [...additionalImages];
                              const updatedPreviews = [
                                ...additionalImagePreviews,
                              ];
                              const updatedNames = [...additionalImageNames];

                              updatedImages[index] = null;
                              updatedPreviews[index] = null;
                              updatedNames[index] = "";

                              setAdditionalImages(updatedImages);
                              setAdditionalImagePreviews(updatedPreviews);
                              setAdditionalImageNames(updatedNames);

                              // Reset the input value
                              fileInputRef.current[index].value = "";
                            }}
                          >
                            Remove Item
                          </button>
                        </div>
                      )}
                      {additionalImageNames[index] && (
                        <p className="file-name">
                          {additionalImageNames[index]}
                        </p>
                      )}
                    </div>
                  </Form.Group>
                ))}
              </Row>
            </div>
          )}

          {/* Purse OR Money Bag Section Additional Details */}

          {inputData.category === "Purse/Money Bag" && (
            <div className="additional-details-section">
              <h3 className="text-center">Additional Details</h3>
              <Row>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formPurseBrand"
                >
                  <Form.Label>Brand (If Any)</Form.Label>
                  <Form.Control
                    type="text"
                    name="purseBrand"
                    value={inputData.purseBrand}
                    onChange={setInputValue}
                    placeholder="Enter Purse/Money Bag Brand"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formPurseModel"
                >
                  <Form.Label>Model (If Any)</Form.Label>
                  <Form.Control
                    type="text"
                    name="purseModel"
                    value={inputData.purseModel}
                    onChange={setInputValue}
                    placeholder="Enter Purse/Money Bag Model"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formPurseColor"
                >
                  <Form.Label>Color (If Any)</Form.Label>
                  <Form.Control
                    type="text"
                    name="purseColor"
                    value={inputData.purseColor}
                    onChange={setInputValue}
                    placeholder="Enter Purse/Money Bag Color"
                  />
                </Form.Group>

                {additionalImages.map((image, index) => (
                  <Form.Group
                    key={index}
                    className="mb-3 col-lg-6"
                    controlId={`formAdditionalImage${index + 1}`}
                  >
                    <Form.Label>Additional Image {index + 1}</Form.Label>
                    <div className="image-upload-container">
                      <Form.Control
                        type="file"
                        onChange={(e) => setAdditionalImage(e, index)}
                        ref={(ref) => (fileInputRef.current[index] = ref)}
                      />
                      {additionalImagePreviews[index] && (
                        <div className="image-preview-box">
                          <h4>Image Preview</h4>
                          <div className="image-preview-container">
                            <img
                              src={additionalImagePreviews[index]}
                              alt={`Additional Image ${index + 1}`}
                              className="image-preview"
                            />
                          </div>
                          <button
                            type="button"
                            className="remove-item-button"
                            onClick={() => {
                              const updatedImages = [...additionalImages];
                              const updatedPreviews = [
                                ...additionalImagePreviews,
                              ];
                              const updatedNames = [...additionalImageNames];

                              updatedImages[index] = null;
                              updatedPreviews[index] = null;
                              updatedNames[index] = "";

                              setAdditionalImages(updatedImages);
                              setAdditionalImagePreviews(updatedPreviews);
                              setAdditionalImageNames(updatedNames);

                              // Reset the input value
                              fileInputRef.current[index].value = "";
                            }}
                          >
                            Remove Item
                          </button>
                        </div>
                      )}
                      {additionalImageNames[index] && (
                        <p className="file-name">
                          {additionalImageNames[index]}
                        </p>
                      )}
                    </div>
                  </Form.Group>
                ))}
              </Row>
            </div>
          )}

          {/* Card Section Additional Details */}

          {inputData.category === "Cards" && (
            <div className="additional-details-section">
              <h3 className="text-center">Additional Details</h3>
              <Row>
                <Form.Group className="mb-3 col-lg-6" controlId="formBrand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={inputData.brand}
                    onChange={setInputValue}
                    placeholder="Enter Brand"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formType">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={inputData.type}
                    onChange={setInputValue}
                    placeholder="Enter Type"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formDebitCredit"
                >
                  <Form.Label>Debit/Credit</Form.Label>
                  <Select
                    options={debitCreditOptions}
                    value={debitCreditOptions.find(
                      (option) => option.value === inputData.debitCredit
                    )}
                    onChange={(value) =>
                      setInputData({ ...inputData, debitCredit: value.value })
                    }
                    placeholder="Select Debit/Credit"
                  />
                </Form.Group>

                {additionalImages.map((image, index) => (
                  <Form.Group
                    key={index}
                    className="mb-3 col-lg-6"
                    controlId={`formAdditionalImage${index + 1}`}
                  >
                    <Form.Label>Additional Image {index + 1}</Form.Label>
                    <div className="image-upload-container">
                      <Form.Control
                        type="file"
                        onChange={(e) => setAdditionalImage(e, index)}
                        ref={(ref) => (fileInputRef.current[index] = ref)}
                      />
                      {additionalImagePreviews[index] && (
                        <div className="image-preview-box">
                          <h4>Image Preview</h4>
                          <div className="image-preview-container">
                            <img
                              src={additionalImagePreviews[index]}
                              alt={`Additional Image ${index + 1}`}
                              className="image-preview"
                            />
                          </div>
                          <button
                            type="button"
                            className="remove-item-button"
                            onClick={() => {
                              const updatedImages = [...additionalImages];
                              const updatedPreviews = [
                                ...additionalImagePreviews,
                              ];
                              const updatedNames = [...additionalImageNames];

                              updatedImages[index] = null;
                              updatedPreviews[index] = null;
                              updatedNames[index] = "";

                              setAdditionalImages(updatedImages);
                              setAdditionalImagePreviews(updatedPreviews);
                              setAdditionalImageNames(updatedNames);

                              // Reset the input value
                              fileInputRef.current[index].value = "";
                            }}
                          >
                            Remove Item
                          </button>
                        </div>
                      )}
                      {additionalImageNames[index] && (
                        <p className="file-name">
                          {additionalImageNames[index]}
                        </p>
                      )}
                    </div>
                  </Form.Group>
                ))}
              </Row>
            </div>
          )}

          {/* Phone Section Additional Details */}

          {inputData.category === "Phone" && (
            <div className="additional-details-section">
              <h3 className="text-center">Additional Details</h3>
              <Row>
                <Form.Group className="mb-3 col-lg-6" controlId="formBrand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={inputData.brand}
                    onChange={setInputValue}
                    placeholder="Enter Brand"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formModel">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    type="text"
                    name="model"
                    value={inputData.model}
                    onChange={setInputValue}
                    placeholder="Enter Model"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formBackColor">
                  <Form.Label>Back Color</Form.Label>
                  <Form.Control
                    type="text"
                    name="backColor"
                    value={inputData.backColor}
                    onChange={setInputValue}
                    placeholder="Enter Back Color"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formRam">
                  <Form.Label>RAM</Form.Label>
                  <Select
                    options={[
                      { value: "1 GB", label: "1 GB" },
                      { value: "2 GB", label: "2 GB" },
                      { value: "3 GB", label: "3 GB" },
                      { value: "4 GB", label: "4 GB" },
                      { value: "6 GB", label: "6 GB" },
                      { value: "8 GB", label: "8 GB" },
                      { value: "12 GB", label: "12 GB" },
                      { value: "16 GB", label: "16 GB" },
                      { value: "18 GB", label: "18 GB" },
                      { value: "24 GB", label: "24 GB" },
                    ]}
                    value={ramOptions.find(
                      (option) => option.value === inputData.type
                    )}
                    onChange={(value) =>
                      setInputData({ ...inputData, type: value.value })
                    }
                    placeholder="Select RAM"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formRam">
                  <Form.Label>ROM</Form.Label>
                  <Select
                    options={[
                      { value: "4 GB", label: "4 GB" },
                      { value: "32 GB", label: "32 GB" },
                      { value: "64 GB", label: "64 GB" },
                      { value: "128 GB", label: "128 GB" },
                      { value: "256 GB", label: "256 GB" },
                      { value: "512 GB", label: "512 GB" },
                      { value: "1 TB", label: "1 TB" },
                    ]}
                    value={romOptions.find(
                      (option) => option.value === inputData.type
                    )}
                    onChange={(value) =>
                      setInputData({ ...inputData, type: value.value })
                    }
                    placeholder="Select ROM"
                  />
                </Form.Group>

                {additionalImages.map((image, index) => (
                  <Form.Group
                    key={index}
                    className="mb-3 col-lg-6"
                    controlId={`formAdditionalImage${index + 1}`}
                  >
                    <Form.Label>Additional Image {index + 1}</Form.Label>
                    <div className="image-upload-container">
                      <Form.Control
                        type="file"
                        onChange={(e) => setAdditionalImage(e, index)}
                        ref={(ref) => (fileInputRef.current[index] = ref)}
                      />
                      {additionalImagePreviews[index] && (
                        <div className="image-preview-box">
                          <h4>Image Preview</h4>
                          <div className="image-preview-container">
                            <img
                              src={additionalImagePreviews[index]}
                              alt={`Additional Image ${index + 1}`}
                              className="image-preview"
                            />
                          </div>
                          <button
                            type="button"
                            className="remove-item-button"
                            onClick={() => {
                              const updatedImages = [...additionalImages];
                              const updatedPreviews = [
                                ...additionalImagePreviews,
                              ];
                              const updatedNames = [...additionalImageNames];

                              updatedImages[index] = null;
                              updatedPreviews[index] = null;
                              updatedNames[index] = "";

                              setAdditionalImages(updatedImages);
                              setAdditionalImagePreviews(updatedPreviews);
                              setAdditionalImageNames(updatedNames);

                              // Reset the input value
                              fileInputRef.current[index].value = "";
                            }}
                          >
                            Remove Item
                          </button>
                        </div>
                      )}
                      {additionalImageNames[index] && (
                        <p className="file-name">
                          {additionalImageNames[index]}
                        </p>
                      )}
                    </div>
                  </Form.Group>
                ))}
              </Row>
            </div>
          )}

          {/* Phone Cover Section Additional Details */}

          {inputData.category === "Phone Cover" && (
            <div className="additional-details-section">
              <h3 className="text-center">Additional Details</h3>
              <Row>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formCoverColor"
                >
                  <Form.Label>Cover Color</Form.Label>
                  <Form.Control
                    type="text"
                    name="coverColor"
                    value={inputData.coverColor}
                    onChange={setInputValue}
                    placeholder="Enter Cover Color"
                  />
                </Form.Group>

                {additionalImages.map((image, index) => (
                  <Form.Group
                    key={index}
                    className="mb-3 col-lg-6"
                    controlId={`formAdditionalImage${index + 1}`}
                  >
                    <Form.Label>Additional Image {index + 1}</Form.Label>
                    <div className="image-upload-container">
                      <Form.Control
                        type="file"
                        onChange={(e) => setAdditionalImage(e, index)}
                        ref={(ref) => (fileInputRef.current[index] = ref)}
                      />
                      {additionalImagePreviews[index] && (
                        <div className="image-preview-box">
                          <h4>Image Preview</h4>
                          <div className="image-preview-container">
                            <img
                              src={additionalImagePreviews[index]}
                              alt={`Additional Image ${index + 1}`}
                              className="image-preview"
                            />
                          </div>
                          <button
                            type="button"
                            className="remove-item-button"
                            onClick={() => {
                              const updatedImages = [...additionalImages];
                              const updatedPreviews = [
                                ...additionalImagePreviews,
                              ];
                              const updatedNames = [...additionalImageNames];

                              updatedImages[index] = null;
                              updatedPreviews[index] = null;
                              updatedNames[index] = "";

                              setAdditionalImages(updatedImages);
                              setAdditionalImagePreviews(updatedPreviews);
                              setAdditionalImageNames(updatedNames);

                              // Reset the input value
                              fileInputRef.current[index].value = "";
                            }}
                          >
                            Remove Item
                          </button>
                        </div>
                      )}
                      {additionalImageNames[index] && (
                        <p className="file-name">
                          {additionalImageNames[index]}
                        </p>
                      )}
                    </div>
                  </Form.Group>
                ))}
              </Row>
            </div>
          )}

          {/* Earphones Section Additional Details */}

          {inputData.category === "Earphones" && (
            <div className="additional-details-section">
              <h3 className="text-center">Additional Details</h3>
              <Row>
                <Form.Group className="mb-3 col-lg-6" controlId="formBrand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={inputData.brand}
                    onChange={setInputValue}
                    placeholder="Enter Brand"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formModel">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    type="text"
                    name="model"
                    value={inputData.model}
                    onChange={setInputValue}
                    placeholder="Enter Model"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formColor">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    name="color"
                    value={inputData.color}
                    onChange={setInputValue}
                    placeholder="Enter Color"
                  />
                </Form.Group>

                {additionalImages.map((image, index) => (
                  <Form.Group
                    key={index}
                    className="mb-3 col-lg-6"
                    controlId={`formAdditionalImage${index + 1}`}
                  >
                    <Form.Label>Additional Image {index + 1}</Form.Label>
                    <div className="image-upload-container">
                      <Form.Control
                        type="file"
                        onChange={(e) => setAdditionalImage(e, index)}
                        ref={(ref) => (fileInputRef.current[index] = ref)}
                      />
                      {additionalImagePreviews[index] && (
                        <div className="image-preview-box">
                          <h4>Image Preview</h4>
                          <div className="image-preview-container">
                            <img
                              src={additionalImagePreviews[index]}
                              alt={`Additional Image ${index + 1}`}
                              className="image-preview"
                            />
                          </div>
                          <button
                            type="button"
                            className="remove-item-button"
                            onClick={() => {
                              const updatedImages = [...additionalImages];
                              const updatedPreviews = [
                                ...additionalImagePreviews,
                              ];
                              const updatedNames = [...additionalImageNames];

                              updatedImages[index] = null;
                              updatedPreviews[index] = null;
                              updatedNames[index] = "";

                              setAdditionalImages(updatedImages);
                              setAdditionalImagePreviews(updatedPreviews);
                              setAdditionalImageNames(updatedNames);

                              // Reset the input value
                              fileInputRef.current[index].value = "";
                            }}
                          >
                            Remove Item
                          </button>
                        </div>
                      )}
                      {additionalImageNames[index] && (
                        <p className="file-name">
                          {additionalImageNames[index]}
                        </p>
                      )}
                    </div>
                  </Form.Group>
                ))}
              </Row>
            </div>
          )}

          {/* Books Section Additional Details */}

          {inputData.category === "Books" && (
            <div className="additional-details-section">
              <h3 className="text-center">Additional Details</h3>
              <Row>
                <Form.Group className="mb-3 col-lg-6" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={inputData.name}
                    onChange={setInputValue}
                    placeholder="Enter Name"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formAuthor">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    type="text"
                    name="author"
                    value={inputData.author}
                    onChange={setInputValue}
                    placeholder="Enter Author"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formPublisher">
                  <Form.Label>Publisher</Form.Label>
                  <Form.Control
                    type="text"
                    name="publisher"
                    value={inputData.publisher}
                    onChange={setInputValue}
                    placeholder="Enter Publisher"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formEdition">
                  <Form.Label>Edition</Form.Label>
                  <Form.Control
                    type="text"
                    name="edition"
                    value={inputData.edition}
                    onChange={setInputValue}
                    placeholder="Enter Edition"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formColor">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    name="color"
                    value={inputData.color}
                    onChange={setInputValue}
                    placeholder="Enter Color"
                  />
                </Form.Group>

                {additionalImages.map((image, index) => (
                  <Form.Group
                    key={index}
                    className="mb-3 col-lg-6"
                    controlId={`formAdditionalImage${index + 1}`}
                  >
                    <Form.Label>Additional Image {index + 1}</Form.Label>
                    <div className="image-upload-container">
                      <Form.Control
                        type="file"
                        onChange={(e) => setAdditionalImage(e, index)}
                        ref={(ref) => (fileInputRef.current[index] = ref)}
                      />
                      {additionalImagePreviews[index] && (
                        <div className="image-preview-box">
                          <h4>Image Preview</h4>
                          <div className="image-preview-container">
                            <img
                              src={additionalImagePreviews[index]}
                              alt={`Additional Image ${index + 1}`}
                              className="image-preview"
                            />
                          </div>
                          <button
                            type="button"
                            className="remove-item-button"
                            onClick={() => {
                              const updatedImages = [...additionalImages];
                              const updatedPreviews = [
                                ...additionalImagePreviews,
                              ];
                              const updatedNames = [...additionalImageNames];

                              updatedImages[index] = null;
                              updatedPreviews[index] = null;
                              updatedNames[index] = "";

                              setAdditionalImages(updatedImages);
                              setAdditionalImagePreviews(updatedPreviews);
                              setAdditionalImageNames(updatedNames);

                              // Reset the input value
                              fileInputRef.current[index].value = "";
                            }}
                          >
                            Remove Item
                          </button>
                        </div>
                      )}
                      {additionalImageNames[index] && (
                        <p className="file-name">
                          {additionalImageNames[index]}
                        </p>
                      )}
                    </div>
                  </Form.Group>
                ))}
              </Row>
            </div>
          )}

          {/* Keyboard/Mouse/Similar Gadgets Section Additional Details */}

          {inputData.category ===
            "Keyboard/Mouse/Charger/Other Similar Gadgets" && (
            <div className="additional-details-section">
              <h3 className="text-center">Additional Details</h3>
              <Row>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formGadgetName"
                >
                  <Form.Label>Gadget Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="gadgetName"
                    value={inputData.gadgetName}
                    onChange={setInputValue}
                    placeholder="Enter Gadget Name"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formBrand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={inputData.brand}
                    onChange={setInputValue}
                    placeholder="Enter Brand"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formModel">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    type="text"
                    name="model"
                    value={inputData.model}
                    onChange={setInputValue}
                    placeholder="Enter Model"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formType">
                  <Form.Label>Type</Form.Label>
                  <Select
                    options={[
                      { value: "Wired", label: "Wired" },
                      { value: "Wireless", label: "Wireless" },
                    ]}
                    value={
                      inputData.type
                        ? { value: inputData.type, label: inputData.type }
                        : null
                    }
                    onChange={(selectedOption) =>
                      setInputValue({
                        target: { name: "type", value: selectedOption.value },
                      })
                    }
                    placeholder="Select Type"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formColor">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    name="color"
                    value={inputData.color}
                    onChange={setInputValue}
                    placeholder="Enter Color"
                  />
                </Form.Group>

                {additionalImages.map((image, index) => (
                  <Form.Group
                    key={index}
                    className="mb-3 col-lg-6"
                    controlId={`formAdditionalImage${index + 1}`}
                  >
                    <Form.Label>Additional Image {index + 1}</Form.Label>
                    <div className="image-upload-container">
                      <Form.Control
                        type="file"
                        onChange={(e) => setAdditionalImage(e, index)}
                        ref={(ref) => (fileInputRef.current[index] = ref)}
                      />
                      {additionalImagePreviews[index] && (
                        <div className="image-preview-box">
                          <h4>Image Preview</h4>
                          <div className="image-preview-container">
                            <img
                              src={additionalImagePreviews[index]}
                              alt={`Additional Image ${index + 1}`}
                              className="image-preview"
                            />
                          </div>
                          <button
                            type="button"
                            className="remove-item-button"
                            onClick={() => {
                              const updatedImages = [...additionalImages];
                              const updatedPreviews = [
                                ...additionalImagePreviews,
                              ];
                              const updatedNames = [...additionalImageNames];

                              updatedImages[index] = null;
                              updatedPreviews[index] = null;
                              updatedNames[index] = "";

                              setAdditionalImages(updatedImages);
                              setAdditionalImagePreviews(updatedPreviews);
                              setAdditionalImageNames(updatedNames);

                              // Reset the input value
                              fileInputRef.current[index].value = "";
                            }}
                          >
                            Remove Item
                          </button>
                        </div>
                      )}
                      {additionalImageNames[index] && (
                        <p className="file-name">
                          {additionalImageNames[index]}
                        </p>
                      )}
                    </div>
                  </Form.Group>
                ))}
              </Row>
            </div>
          )}

          {/* Glasses/Spectacles/Goggles Section Additional Details */}

          {inputData.category === "Glasses/Spectacles/Goggles" && (
            <div className="additional-details-section">
              <h3 className="text-center">Additional Details</h3>
              <Row>
                <Form.Group className="mb-3 col-lg-6" controlId="formBrand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={inputData.brand}
                    onChange={setInputValue}
                    placeholder="Enter Brand"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formRimShape">
                  <Form.Label>Rim Shape</Form.Label>
                  <Form.Control
                    type="text"
                    name="rimShape"
                    value={inputData.rimShape}
                    onChange={setInputValue}
                    placeholder="Enter Rim Shape"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formColor">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    name="color"
                    value={inputData.color}
                    onChange={setInputValue}
                    placeholder="Enter Color"
                  />
                </Form.Group>

                {additionalImages.map((image, index) => (
                  <Form.Group
                    key={index}
                    className="mb-3 col-lg-6"
                    controlId={`formAdditionalImage${index + 1}`}
                  >
                    <Form.Label>Additional Image {index + 1}</Form.Label>
                    <div className="image-upload-container">
                      <Form.Control
                        type="file"
                        onChange={(e) => setAdditionalImage(e, index)}
                        ref={(ref) => (fileInputRef.current[index] = ref)}
                      />
                      {additionalImagePreviews[index] && (
                        <div className="image-preview-box">
                          <h4>Image Preview</h4>
                          <div className="image-preview-container">
                            <img
                              src={additionalImagePreviews[index]}
                              alt={`Additional Image ${index + 1}`}
                              className="image-preview"
                            />
                          </div>
                          <button
                            type="button"
                            className="remove-item-button"
                            onClick={() => {
                              const updatedImages = [...additionalImages];
                              const updatedPreviews = [
                                ...additionalImagePreviews,
                              ];
                              const updatedNames = [...additionalImageNames];

                              updatedImages[index] = null;
                              updatedPreviews[index] = null;
                              updatedNames[index] = "";

                              setAdditionalImages(updatedImages);
                              setAdditionalImagePreviews(updatedPreviews);
                              setAdditionalImageNames(updatedNames);

                              // Reset the input value
                              fileInputRef.current[index].value = "";
                            }}
                          >
                            Remove Item
                          </button>
                        </div>
                      )}
                      {additionalImageNames[index] && (
                        <p className="file-name">
                          {additionalImageNames[index]}
                        </p>
                      )}
                    </div>
                  </Form.Group>
                ))}
              </Row>
            </div>
          )}

          {/* Speakers Section Additional Details */}

          {inputData.category === "Speakers" && (
            <div className="additional-details-section">
              <h3 className="text-center">Additional Details</h3>
              <Row>
                <Form.Group className="mb-3 col-lg-6" controlId="formBrand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={inputData.brand}
                    onChange={setInputValue}
                    placeholder="Enter Brand"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formModel">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    type="text"
                    name="model"
                    value={inputData.model}
                    onChange={setInputValue}
                    placeholder="Enter Model"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formShape">
                  <Form.Label>Shape</Form.Label>
                  <Form.Control
                    type="text"
                    name="shape"
                    value={inputData.shape}
                    onChange={setInputValue}
                    placeholder="Enter Shape"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formColor">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    name="color"
                    value={inputData.color}
                    onChange={setInputValue}
                    placeholder="Enter Color"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formSize">
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    type="text"
                    name="size"
                    value={inputData.size}
                    onChange={setInputValue}
                    placeholder="Enter Size"
                  />
                </Form.Group>

                {additionalImages.map((image, index) => (
                  <Form.Group
                    key={index}
                    className="mb-3 col-lg-6"
                    controlId={`formAdditionalImage${index + 1}`}
                  >
                    <Form.Label>Additional Image {index + 1}</Form.Label>
                    <div className="image-upload-container">
                      <Form.Control
                        type="file"
                        onChange={(e) => setAdditionalImage(e, index)}
                        ref={(ref) => (fileInputRef.current[index] = ref)}
                      />
                      {additionalImagePreviews[index] && (
                        <div className="image-preview-box">
                          <h4>Image Preview</h4>
                          <div className="image-preview-container">
                            <img
                              src={additionalImagePreviews[index]}
                              alt={`Additional Image ${index + 1}`}
                              className="image-preview"
                            />
                          </div>
                          <button
                            type="button"
                            className="remove-item-button"
                            onClick={() => {
                              const updatedImages = [...additionalImages];
                              const updatedPreviews = [
                                ...additionalImagePreviews,
                              ];
                              const updatedNames = [...additionalImageNames];

                              updatedImages[index] = null;
                              updatedPreviews[index] = null;
                              updatedNames[index] = "";

                              setAdditionalImages(updatedImages);
                              setAdditionalImagePreviews(updatedPreviews);
                              setAdditionalImageNames(updatedNames);

                              // Reset the input value
                              fileInputRef.current[index].value = "";
                            }}
                          >
                            Remove Item
                          </button>
                        </div>
                      )}
                      {additionalImageNames[index] && (
                        <p className="file-name">
                          {additionalImageNames[index]}
                        </p>
                      )}
                    </div>
                  </Form.Group>
                ))}
              </Row>
            </div>
          )}

          {/* Lunch Box/Bottle Section Additional Details */}

          {inputData.category === "Lunch Box/Bottle" && (
            <div className="additional-details-section">
              <h3 className="text-center">Additional Details</h3>
              <Row>
                <Form.Group className="mb-3 col-lg-6" controlId="formBrand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={inputData.brand}
                    onChange={setInputValue}
                    placeholder="Enter Brand"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formMaterial">
                  <Form.Label>Material</Form.Label>
                  <Form.Control
                    type="text"
                    name="material"
                    value={inputData.material}
                    onChange={setInputValue}
                    placeholder="Enter Material"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formShape">
                  <Form.Label>Shape</Form.Label>
                  <Form.Control
                    type="text"
                    name="shape"
                    value={inputData.shape}
                    onChange={setInputValue}
                    placeholder="Enter Shape"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formColor">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    name="color"
                    value={inputData.color}
                    onChange={setInputValue}
                    placeholder="Enter Color"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formSize">
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    type="text"
                    name="size"
                    value={inputData.size}
                    onChange={setInputValue}
                    placeholder="Enter Size"
                  />
                </Form.Group>

                {additionalImages.map((image, index) => (
                  <Form.Group
                    key={index}
                    className="mb-3 col-lg-6"
                    controlId={`formAdditionalImage${index + 1}`}
                  >
                    <Form.Label>Additional Image {index + 1}</Form.Label>
                    <div className="image-upload-container">
                      <Form.Control
                        type="file"
                        onChange={(e) => setAdditionalImage(e, index)}
                        ref={(ref) => (fileInputRef.current[index] = ref)}
                      />
                      {additionalImagePreviews[index] && (
                        <div className="image-preview-box">
                          <h4>Image Preview</h4>
                          <div className="image-preview-container">
                            <img
                              src={additionalImagePreviews[index]}
                              alt={`Additional Image ${index + 1}`}
                              className="image-preview"
                            />
                          </div>
                          <button
                            type="button"
                            className="remove-item-button"
                            onClick={() => {
                              const updatedImages = [...additionalImages];
                              const updatedPreviews = [
                                ...additionalImagePreviews,
                              ];
                              const updatedNames = [...additionalImageNames];

                              updatedImages[index] = null;
                              updatedPreviews[index] = null;
                              updatedNames[index] = "";

                              setAdditionalImages(updatedImages);
                              setAdditionalImagePreviews(updatedPreviews);
                              setAdditionalImageNames(updatedNames);

                              // Reset the input value
                              fileInputRef.current[index].value = "";
                            }}
                          >
                            Remove Item
                          </button>
                        </div>
                      )}
                      {additionalImageNames[index] && (
                        <p className="file-name">
                          {additionalImageNames[index]}
                        </p>
                      )}
                    </div>
                  </Form.Group>
                ))}
              </Row>
            </div>
          )}

          {/* Pen Drive/USB/Similar Gadgets Section Additional Details */}

          {inputData.category === "Pen Drive/USB/Similar Gadgets" && (
            <div className="additional-details-section">
              <h3 className="text-center">Additional Details</h3>
              <Row>
                <Form.Group className="mb-3 col-lg-6" controlId="formBrand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={inputData.brand}
                    onChange={setInputValue}
                    placeholder="Enter Brand"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formModel">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    type="text"
                    name="model"
                    value={inputData.model}
                    onChange={setInputValue}
                    placeholder="Enter Model"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formShape">
                  <Form.Label>Shape</Form.Label>
                  <Form.Control
                    type="text"
                    name="shape"
                    value={inputData.shape}
                    onChange={setInputValue}
                    placeholder="Enter Shape"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formColor">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    name="color"
                    value={inputData.color}
                    onChange={setInputValue}
                    placeholder="Enter Color"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formSize">
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    type="text"
                    name="size"
                    value={inputData.size}
                    onChange={setInputValue}
                    placeholder="Enter Size"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formMaterial">
                  <Form.Label>Material</Form.Label>
                  <Form.Control
                    type="text"
                    name="material"
                    value={inputData.material}
                    onChange={setInputValue}
                    placeholder="Enter Material"
                  />
                </Form.Group>

                {additionalImages.map((image, index) => (
                  <Form.Group
                    key={index}
                    className="mb-3 col-lg-6"
                    controlId={`formAdditionalImage${index + 1}`}
                  >
                    <Form.Label>Additional Image {index + 1}</Form.Label>
                    <div className="image-upload-container">
                      <Form.Control
                        type="file"
                        onChange={(e) => setAdditionalImage(e, index)}
                        ref={(ref) => (fileInputRef.current[index] = ref)}
                      />
                      {additionalImagePreviews[index] && (
                        <div className="image-preview-box">
                          <h4>Image Preview</h4>
                          <div className="image-preview-container">
                            <img
                              src={additionalImagePreviews[index]}
                              alt={`Additional Image ${index + 1}`}
                              className="image-preview"
                            />
                          </div>
                          <button
                            type="button"
                            className="remove-item-button"
                            onClick={() => {
                              const updatedImages = [...additionalImages];
                              const updatedPreviews = [
                                ...additionalImagePreviews,
                              ];
                              const updatedNames = [...additionalImageNames];

                              updatedImages[index] = null;
                              updatedPreviews[index] = null;
                              updatedNames[index] = "";

                              setAdditionalImages(updatedImages);
                              setAdditionalImagePreviews(updatedPreviews);
                              setAdditionalImageNames(updatedNames);

                              // Reset the input value
                              fileInputRef.current[index].value = "";
                            }}
                          >
                            Remove Item
                          </button>
                        </div>
                      )}
                      {additionalImageNames[index] && (
                        <p className="file-name">
                          {additionalImageNames[index]}
                        </p>
                      )}
                    </div>
                  </Form.Group>
                ))}
              </Row>
            </div>
          )}

          {/* Make-Up Kit Section Additional Details */}

          {inputData.category === "Make-Up Kit" && (
            <div className="additional-details-section">
              <h3 className="text-center">Additional Details</h3>
              <Row>
                <Form.Group className="mb-3 col-lg-6" controlId="formBrand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={inputData.brand}
                    onChange={setInputValue}
                    placeholder="Enter Brand"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formShape">
                  <Form.Label>Shape</Form.Label>
                  <Form.Control
                    type="text"
                    name="shape"
                    value={inputData.shape}
                    onChange={setInputValue}
                    placeholder="Enter Shape"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formSize">
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    type="text"
                    name="size"
                    value={inputData.size}
                    onChange={setInputValue}
                    placeholder="Enter Size"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formColor">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    name="color"
                    value={inputData.color}
                    onChange={setInputValue}
                    placeholder="Enter Color"
                  />
                </Form.Group>

                {additionalImages.map((image, index) => (
                  <Form.Group
                    key={index}
                    className="mb-3 col-lg-6"
                    controlId={`formAdditionalImage${index + 1}`}
                  >
                    <Form.Label>Additional Image {index + 1}</Form.Label>
                    <div className="image-upload-container">
                      <Form.Control
                        type="file"
                        onChange={(e) => setAdditionalImage(e, index)}
                        ref={(ref) => (fileInputRef.current[index] = ref)}
                      />
                      {additionalImagePreviews[index] && (
                        <div className="image-preview-box">
                          <h4>Image Preview</h4>
                          <div className="image-preview-container">
                            <img
                              src={additionalImagePreviews[index]}
                              alt={`Additional Image ${index + 1}`}
                              className="image-preview"
                            />
                          </div>
                          <button
                            type="button"
                            className="remove-item-button"
                            onClick={() => {
                              const updatedImages = [...additionalImages];
                              const updatedPreviews = [
                                ...additionalImagePreviews,
                              ];
                              const updatedNames = [...additionalImageNames];

                              updatedImages[index] = null;
                              updatedPreviews[index] = null;
                              updatedNames[index] = "";

                              setAdditionalImages(updatedImages);
                              setAdditionalImagePreviews(updatedPreviews);
                              setAdditionalImageNames(updatedNames);

                              // Reset the input value
                              fileInputRef.current[index].value = "";
                            }}
                          >
                            Remove Item
                          </button>
                        </div>
                      )}
                      {additionalImageNames[index] && (
                        <p className="file-name">
                          {additionalImageNames[index]}
                        </p>
                      )}
                    </div>
                  </Form.Group>
                ))}
              </Row>
            </div>
          )}

          {/* Jewellery/Chains/Rings/Similar Items Section Additional Details */}

          {inputData.category === "Jewellery/Chains/Rings/Similar Items" && (
            <div className="additional-details-section">
              <h3 className="text-center">Additional Details</h3>
              <Row>
                <Form.Group className="mb-3 col-lg-6" controlId="formBrand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={inputData.brand}
                    onChange={setInputValue}
                    placeholder="Enter Brand"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formMaterial">
                  <Form.Label>Material</Form.Label>
                  <Form.Control
                    type="text"
                    name="material"
                    value={inputData.material}
                    onChange={setInputValue}
                    placeholder="Enter Material"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formSize">
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    type="text"
                    name="size"
                    value={inputData.size}
                    onChange={setInputValue}
                    placeholder="Enter Size"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formAge">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="text"
                    name="age"
                    value={inputData.age}
                    onChange={setInputValue}
                    placeholder="Enter Age"
                  />
                </Form.Group>

                {additionalImages.map((image, index) => (
                  <Form.Group
                    key={index}
                    className="mb-3 col-lg-6"
                    controlId={`formAdditionalImage${index + 1}`}
                  >
                    <Form.Label>Additional Image {index + 1}</Form.Label>
                    <div className="image-upload-container">
                      <Form.Control
                        type="file"
                        onChange={(e) => setAdditionalImage(e, index)}
                        ref={(ref) => (fileInputRef.current[index] = ref)}
                      />
                      {additionalImagePreviews[index] && (
                        <div className="image-preview-box">
                          <h4>Image Preview</h4>
                          <div className="image-preview-container">
                            <img
                              src={additionalImagePreviews[index]}
                              alt={`Additional Image ${index + 1}`}
                              className="image-preview"
                            />
                          </div>
                          <button
                            type="button"
                            className="remove-item-button"
                            onClick={() => {
                              const updatedImages = [...additionalImages];
                              const updatedPreviews = [
                                ...additionalImagePreviews,
                              ];
                              const updatedNames = [...additionalImageNames];

                              updatedImages[index] = null;
                              updatedPreviews[index] = null;
                              updatedNames[index] = "";

                              setAdditionalImages(updatedImages);
                              setAdditionalImagePreviews(updatedPreviews);
                              setAdditionalImageNames(updatedNames);

                              // Reset the input value
                              fileInputRef.current[index].value = "";
                            }}
                          >
                            Remove Item
                          </button>
                        </div>
                      )}
                      {additionalImageNames[index] && (
                        <p className="file-name">
                          {additionalImageNames[index]}
                        </p>
                      )}
                    </div>
                  </Form.Group>
                ))}
              </Row>
            </div>
          )}

          {/* Outfit Section Additional Details */}

          {inputData.category === "Outfit" && (
            <div className="additional-details-section">
              <h3 className="text-center">Additional Details</h3>
              <Row>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formOutfitType"
                >
                  <Form.Label>Outfit Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="outfitType"
                    value={inputData.outfitType}
                    onChange={setInputValue}
                    placeholder="Enter Outfit Type"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formMaterial">
                  <Form.Label>Material</Form.Label>
                  <Form.Control
                    type="text"
                    name="material"
                    value={inputData.material}
                    onChange={setInputValue}
                    placeholder="Enter Material"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formDesignOrText"
                >
                  <Form.Label>Design or Text</Form.Label>
                  <Form.Control
                    type="text"
                    name="designOrText"
                    value={inputData.designOrText}
                    onChange={setInputValue}
                    placeholder="Enter Design or Text"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formColor">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    name="color"
                    value={inputData.color}
                    onChange={setInputValue}
                    placeholder="Enter Color"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formSize">
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    type="text"
                    name="size"
                    value={inputData.size}
                    onChange={setInputValue}
                    placeholder="Enter Size"
                  />
                </Form.Group>

                {additionalImages.map((image, index) => (
                  <Form.Group
                    key={index}
                    className="mb-3 col-lg-6"
                    controlId={`formAdditionalImage${index + 1}`}
                  >
                    <Form.Label>Additional Image {index + 1}</Form.Label>
                    <div className="image-upload-container">
                      <Form.Control
                        type="file"
                        onChange={(e) => setAdditionalImage(e, index)}
                        ref={(ref) => (fileInputRef.current[index] = ref)}
                      />
                      {additionalImagePreviews[index] && (
                        <div className="image-preview-box">
                          <h4>Image Preview</h4>
                          <div className="image-preview-container">
                            <img
                              src={additionalImagePreviews[index]}
                              alt={`Additional Image ${index + 1}`}
                              className="image-preview"
                            />
                          </div>
                          <button
                            type="button"
                            className="remove-item-button"
                            onClick={() => {
                              const updatedImages = [...additionalImages];
                              const updatedPreviews = [
                                ...additionalImagePreviews,
                              ];
                              const updatedNames = [...additionalImageNames];

                              updatedImages[index] = null;
                              updatedPreviews[index] = null;
                              updatedNames[index] = "";

                              setAdditionalImages(updatedImages);
                              setAdditionalImagePreviews(updatedPreviews);
                              setAdditionalImageNames(updatedNames);

                              // Reset the input value
                              fileInputRef.current[index].value = "";
                            }}
                          >
                            Remove Item
                          </button>
                        </div>
                      )}
                      {additionalImageNames[index] && (
                        <p className="file-name">
                          {additionalImageNames[index]}
                        </p>
                      )}
                    </div>
                  </Form.Group>
                ))}
              </Row>
            </div>
          )}

          {/* Others Section Additional Details */}

          {inputData.category === "Others" && (
            <div className="additional-details-section">
              <h3 className="text-center">Additional Details</h3>
              <Row>
                <Form.Group className="mb-3 col-lg-6" controlId="formBrand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={inputData.brand}
                    onChange={setInputValue}
                    placeholder="Enter Brand"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formModel">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    type="text"
                    name="model"
                    value={inputData.model}
                    onChange={setInputValue}
                    placeholder="Enter Model"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formColor">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    name="color"
                    value={inputData.color}
                    onChange={setInputValue}
                    placeholder="Enter Color"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formType">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={inputData.type}
                    onChange={setInputValue}
                    placeholder="Enter Type"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formShape">
                  <Form.Label>Shape</Form.Label>
                  <Form.Control
                    type="text"
                    name="shape"
                    value={inputData.shape}
                    onChange={setInputValue}
                    placeholder="Enter Shape"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formMaterial">
                  <Form.Label>Material</Form.Label>
                  <Form.Control
                    type="text"
                    name="material"
                    value={inputData.material}
                    onChange={setInputValue}
                    placeholder="Enter Material"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formAge">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="text"
                    name="age"
                    value={inputData.age}
                    onChange={setInputValue}
                    placeholder="Enter Age"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formSize">
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    type="text"
                    name="size"
                    value={inputData.size}
                    onChange={setInputValue}
                    placeholder="Enter Size"
                  />
                </Form.Group>

                {additionalImages.map((image, index) => (
                  <Form.Group
                    key={index}
                    className="mb-3 col-lg-6"
                    controlId={`formAdditionalImage${index + 1}`}
                  >
                    <Form.Label>Additional Image {index + 1}</Form.Label>
                    <div className="image-upload-container">
                      <Form.Control
                        type="file"
                        onChange={(e) => setAdditionalImage(e, index)}
                        ref={(ref) => (fileInputRef.current[index] = ref)}
                      />
                      {additionalImagePreviews[index] && (
                        <div className="image-preview-box">
                          <h4>Image Preview</h4>
                          <div className="image-preview-container">
                            <img
                              src={additionalImagePreviews[index]}
                              alt={`Additional Image ${index + 1}`}
                              className="image-preview"
                            />
                          </div>
                          <button
                            type="button"
                            className="remove-item-button"
                            onClick={() => {
                              const updatedImages = [...additionalImages];
                              const updatedPreviews = [
                                ...additionalImagePreviews,
                              ];
                              const updatedNames = [...additionalImageNames];

                              updatedImages[index] = null;
                              updatedPreviews[index] = null;
                              updatedNames[index] = "";

                              setAdditionalImages(updatedImages);
                              setAdditionalImagePreviews(updatedPreviews);
                              setAdditionalImageNames(updatedNames);

                              // Reset the input value
                              fileInputRef.current[index].value = "";
                            }}
                          >
                            Remove Item
                          </button>
                        </div>
                      )}
                      {additionalImageNames[index] && (
                        <p className="file-name">
                          {additionalImageNames[index]}
                        </p>
                      )}
                    </div>
                  </Form.Group>
                ))}
              </Row>
            </div>
          )}

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" onClick={submitItemData}>
              Submit
            </Button>
          </div>
        </Form>
      </Card>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default AddItem;
