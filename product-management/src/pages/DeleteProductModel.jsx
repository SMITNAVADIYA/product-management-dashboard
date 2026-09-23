import Button from "../components/common/Button";

function DeleteProductModal({
  product,
  onConfirm,
  onCancel,
  deleting = false,
}) {
  if (!product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-bold text-gray-900">Delete Product</h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-900">{product.title}</span>?
          This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onCancel} disabled={deleting}>
            Cancel
          </Button>

          <Button variant="danger" loading={deleting} onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProductModal;
