import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export default function FileDropzone({ onUpload, isLoading }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onUpload(acceptedFiles[0])
      }
    },
    [onUpload]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    maxFiles: 1,
    disabled: isLoading,
  })

  if (isLoading) {
    return (
      <div className="border-2 border-blue-200 bg-blue-50/50 rounded-2xl p-16 text-center">
        <div className="flex flex-col items-center gap-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-blue-100 border-t-blue-500 animate-spin" />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-700">Analisando seus dados...</p>
            <p className="text-sm text-slate-400 mt-1">Detectando padroes e gerando graficos</p>
          </div>
          <div className="w-48 h-1.5 bg-blue-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full animate-pulse-soft" style={{ width: '70%' }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-200 cursor-pointer
        ${isDragActive
          ? 'border-blue-400 bg-blue-50 scale-[1.01] shadow-lg shadow-blue-100'
          : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50 hover:shadow-md'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-5">
        <div className={`w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center transition-transform duration-200 ${isDragActive ? 'scale-110' : ''}`}>
          <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <div>
          <p className="text-xl font-semibold text-slate-700">
            {isDragActive ? 'Solte o arquivo aqui' : 'Arraste seu arquivo Excel'}
          </p>
          <p className="text-sm text-slate-400 mt-2">ou clique para selecionar (.xlsx, .xls)</p>
          <p className="text-xs text-slate-300 mt-3">Maximo 50MB</p>
        </div>
      </div>
    </div>
  )
}
