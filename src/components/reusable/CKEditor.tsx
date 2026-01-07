'use client';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { cn } from '@/lib/utils';

interface CustomEditorProps {
    value?: string;
    onChange?: (data: string) => void;
    label?: string;
    error?: string;
    placeholder?: string;
    className?: string;
    config?: any;
    height?: string | number;
}

// Custom upload adapter for Base64 image encoding
class Base64UploadAdapter {
    loader: any;

    constructor(loader: any) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then((file: File) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = () => {
                resolve({ default: reader.result });
            };
            
            reader.onerror = (error) => {
                reject(error);
            };
            
            reader.onabort = () => {
                reject();
            };
            
            reader.readAsDataURL(file);
        }));
    }

    abort() {
        // Handle abort if needed
    }
}

function Base64UploadAdapterPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
        return new Base64UploadAdapter(loader);
    };
}

const CustomEditor = ({
    value = '',
    onChange,
    label,
    error,
    placeholder,
    className,
    config,
    height = '200px'
}: CustomEditorProps) => {

    // Default toolbar configuration
    const defaultToolbar = [
        'undo', 'redo', '|',
        'heading', '|',
        'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor', '|',
        'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'code', 'removeFormat', '|',
        'link', 'imageUpload', 'mediaEmbed', 'insertTable', 'blockQuote', 'codeBlock', 'horizontalLine', '|',
        'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent', '|',
        'alignment'
    ];

    const editorConfig = {
        placeholder: placeholder || 'Type your content here...',
        toolbar: config?.toolbar || defaultToolbar,
        extraPlugins: [Base64UploadAdapterPlugin],
        image: {
            toolbar: [
                'imageTextAlternative', 'toggleImageCaption', '|',
                'imageStyle:inline', 'imageStyle:block', 'imageStyle:side', '|',
                'linkImage'
            ],
            resizeOptions: [
                {
                    name: 'resizeImage:original',
                    label: 'Original',
                    value: null
                },
                {
                    name: 'resizeImage:25',
                    label: '25%',
                    value: '25'
                },
                {
                    name: 'resizeImage:50',
                    label: '50%',
                    value: '50'
                },
                {
                    name: 'resizeImage:75',
                    label: '75%',
                    value: '75'
                }
            ],
            styles: [
                'full',
                'side',
                'alignLeft',
                'alignCenter',
                'alignRight'
            ]
        },
        ...config
    };

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            {label && (
                <label className={cn(
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    error ? "text-destructive" : "text-foreground"
                )}>
                    {label}
                </label>
            )}

            <div className={cn(
                "group relative rounded-md border border-input bg-background ring-offset-background w-full min-w-0",
                "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                error && "border-destructive focus-within:ring-destructive",
                "ck-editor-container"
            )}>
                <style>{`
                    .ck-editor-container .ck.ck-editor {
                        max-width: 100% !important;
                    }
                    .ck-editor-container .ck-toolbar {
                        border: 0 !important;
                        border-bottom: 1px solid var(--input) !important;
                        background: transparent !important;
                        border-top-left-radius: calc(var(--radius) - 2px) !important;
                        border-top-right-radius: calc(var(--radius) - 2px) !important;
                        max-width: 100% !important;
                        flex-wrap: wrap !important;
                    }
                    
                    .ck-editor-container .ck-content {
                        border: 0 !important;
                        background: transparent !important;
                        box-shadow: none !important;
                        min-height: ${typeof height === 'number' ? `${height}px` : height};
                        border-bottom-left-radius: calc(var(--radius) - 2px) !important;
                        border-bottom-right-radius: calc(var(--radius) - 2px) !important;
                        padding: 0 1rem !important;
                        max-width: 100% !important;
                        word-wrap: break-word !important;
                    }

                    .ck-editor-container .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
                        border-color: transparent !important;
                        box-shadow: none !important;
                    }
                    
                    .ck-editor-container .ck.ck-editor__main > .ck-editor__editable.ck-focused {
                        border: 0 !important;
                        box-shadow: none !important;
                    }

                    .dark .ck-editor-container .ck-toolbar {
                        background: var(--card) !important;
                    }
                    .dark .ck-content {
                        color: var(--foreground) !important;
                    }
                `}</style>

                <CKEditor
                    editor={ClassicEditor as any}
                    data={value}
                    config={editorConfig}
                    onChange={(event, editor) => {
                        onChange?.(editor.getData());
                    }}
                />
            </div>

            {error && (
                <p className="text-sm font-medium text-destructive">
                    {error}
                </p>
            )}
        </div>
    );
};

export default CustomEditor;