import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { productSchema } from "../../validations/productSchema";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";
import { CATEGORY_OPTIONS } from "../../constants/productConstants";
import Textarea from "../common/Textarea";

function ProductForm({
  initialValues,
  onSubmit,
  submitLabel = "Save Product",
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState("");
  const imagePreview = newImagePreview || initialValues?.image || "";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(productSchema(initialValues?.image)),

    defaultValues: {
      title: initialValues?.title || "",
      category: initialValues?.category || "",
      price: initialValues?.price ?? "",
      stock: initialValues?.stock ?? "",
      brand: initialValues?.brand || "",
      description: initialValues?.description || "",
      image: undefined,
    },

    mode: "all",
  });

  // --------------------------------
  // Image change
  // --------------------------------

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSelectedImage(file);

    const previewUrl = URL.createObjectURL(file);

    setNewImagePreview(previewUrl);
  };

  // --------------------------------
  // Submit
  // --------------------------------

  const submitHandler = async (data) => {
    if (selectedImage) {
      const imageBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result);
        };

        reader.onerror = () => {
          reject(new Error("Failed to read image."));
        };

        reader.readAsDataURL(selectedImage);
      });

      await onSubmit({
        ...data,

        price: Number(data.price),

        stock: Number(data.stock),

        image: imageBase64,
      });

      return;
    }

    await onSubmit({
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
      image: initialValues?.image || "",
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      {/* Product Name */}
      <Input
        label="Product Name"
        type="text"
        placeholder="Enter product name"
        error={errors.title}
        {...register("title")}
      />

      {/* Category */}
      <Select
        label="Category"
        error={errors.category}
        {...register("category")}
        options={[
          {
            value: "",
            label: "Select category",
          },
          ...CATEGORY_OPTIONS.map((category) => ({
            value: category,
            label: category,
          })),
        ]}
      />

      {/* Price + Stock */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Price"
          type="number"
          placeholder="Enter price"
          error={errors.price}
          {...register("price")}
        />

        <Input
          label="Stock"
          type="number"
          placeholder="Enter stock"
          error={errors.stock}
          {...register("stock")}
        />
      </div>

      {/* Brand */}
      <Input
        label="Brand"
        type="text"
        placeholder="Enter brand"
        error={errors.brand}
        {...register("brand")}
      />

      {/* Description */}
      <Textarea
        label="Description"
        placeholder="Enter product description"
        rows={5}
        error={errors.description}
        {...register("description")}
      />

      {/* Product Image */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Product Image
        </label>

        {/* Existing / New Image */}
        {imagePreview && (
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Product preview"
              className="h-40 w-40 rounded-lg border border-gray-200 object-cover"
            />
          </div>
        )}

        <Input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          {...register("image")}
          onChange={(event) => {
            register("image").onChange(event);

            handleImageChange(event);
          }}
          className="cursor-pointer"
        />

        {errors.image && (
          <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>
        )}

        <p className="mt-1 text-xs text-gray-500">
          Select PNG, JPG or WEBP image.
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
        <Button
          type="button"
          disabled={isSubmitting}
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

export default ProductForm;
