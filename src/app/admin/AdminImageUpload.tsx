"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  X,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";

type UploadStatus = "idle" | "uploading" | "success" | "error";

interface UploadedImage {
  id: string;
  name: string;
  url: string;
  size: number;
  uploadedAt: Date;
}

const AdminImageUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [message, setMessage] = useState<string>("");
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manejo del arrastre de archivos
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  // Validación y manejo de archivos
  const validateFiles = (fileList: File[]): File[] => {
    return fileList.filter((file) => {
      // Verificar que sea una imagen
      if (!file.type.match("image.*")) {
        setMessage("Solo se permiten archivos de imagen");
        return false;
      }

      // Verificar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage("Las imágenes deben ser menores a 5MB");
        return false;
      }

      return true;
    });
  };

  const handleFiles = (fileList: File[]) => {
    const validFiles = validateFiles(fileList);
    if (validFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
      setMessage("");
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files);
      handleFiles(fileArray);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Simulación de la carga de archivos (en un sistema real, esto sería una llamada API)
  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage("Por favor, selecciona al menos una imagen para subir");
      return;
    }

    setUploadStatus("uploading");
    setMessage("Subiendo imágenes...");

    try {
      // Simulamos un retardo para mostrar el estado de carga
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulamos la creación de URLs para las imágenes subidas
      const newUploadedImages: UploadedImage[] = files.map((file) => ({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        name: file.name,
        // En un sistema real, esta URL vendría del servidor
        url: URL.createObjectURL(file),
        size: file.size,
        uploadedAt: new Date(),
      }));

      setUploadedImages((prev) => [...prev, ...newUploadedImages]);
      setFiles([]);
      setUploadStatus("success");
      setMessage("Imágenes subidas correctamente");

      // Reiniciar el mensaje después de un tiempo
      setTimeout(() => {
        setUploadStatus("idle");
        setMessage("");
      }, 3000);
    } catch (error) {
      setUploadStatus("error");
      setMessage("Error al subir las imágenes. Inténtalo de nuevo.");
    }
  };

  // Formateo del tamaño de archivo
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / 1048576).toFixed(2) + " MB";
  };

  // Mostrar vista previa de las imágenes a subir
  const renderPreview = (file: File, index: number) => {
    const url = URL.createObjectURL(file);

    return (
      <div
        key={index}
        className="relative border rounded-lg overflow-hidden group"
      >
        <div className="relative w-full h-40">
          <Image
            src={url}
            alt={file.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
          <button
            onClick={() => removeFile(index)}
            className="p-1 rounded-full bg-white text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Eliminar imagen"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-2 bg-white">
          <p className="text-sm font-medium truncate">{file.name}</p>
          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
        </div>
      </div>
    );
  };

  // Renderizar la galería de imágenes ya subidas
  const renderGallery = () => {
    if (uploadedImages.length === 0) {
      return (
        <div className="text-center text-gray-500 p-8 bg-gray-50 rounded-lg">
          <ImageIcon size={48} className="mx-auto mb-4 text-gray-400" />
          <p>No hay imágenes subidas aún</p>
        </div>
      );
    }

    return (
      <div>
        <h4 className="text-lg font-semibold mb-4">Imágenes Subidas</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {uploadedImages.map((img) => (
            <div key={img.id} className="border rounded-lg overflow-hidden">
              <div className="relative w-full h-40">
                <Image
                  src={img.url}
                  alt={img.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-2 bg-white">
                <p className="text-sm font-medium truncate">{img.name}</p>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">
                    {formatFileSize(img.size)}
                  </p>
                  <button
                    className="text-xs text-primary-600 hover:text-primary-800"
                    onClick={() => navigator.clipboard.writeText(img.url)}
                  >
                    Copiar URL
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Gestión de Imágenes
      </h3>

      {/* Área de carga */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
          isDragging
            ? "border-primary-500 bg-primary-50"
            : "border-gray-300 hover:border-primary-300"
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Upload size={48} className="mx-auto mb-4 text-gray-400" />
        <p className="text-lg font-medium mb-2">
          Arrastra y suelta imágenes aquí
        </p>
        <p className="text-sm text-gray-500 mb-4">
          O haz clic para seleccionar archivos
        </p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          className="hidden"
          accept="image/*"
          multiple
        />
        <button
          onClick={triggerFileInput}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Seleccionar Imágenes
        </button>

        {message && (
          <div
            className={`mt-3 text-sm ${
              uploadStatus === "error"
                ? "text-red-600"
                : uploadStatus === "success"
                ? "text-green-600"
                : "text-gray-600"
            }`}
          >
            {uploadStatus === "error" && (
              <AlertCircle size={16} className="inline mr-1" />
            )}
            {uploadStatus === "success" && (
              <CheckCircle size={16} className="inline mr-1" />
            )}
            {message}
          </div>
        )}
      </div>

      {/* Vista previa de archivos seleccionados */}
      {files.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-lg font-semibold">
              Archivos Seleccionados ({files.length})
            </h4>
            <div>
              <button
                onClick={handleUpload}
                disabled={uploadStatus === "uploading"}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:bg-gray-400"
              >
                {uploadStatus === "uploading"
                  ? "Subiendo..."
                  : "Subir Imágenes"}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {files.map((file, index) => renderPreview(file, index))}
          </div>
        </div>
      )}

      {/* Galería de imágenes subidas */}
      {renderGallery()}
    </div>
  );
};

export default AdminImageUpload;
