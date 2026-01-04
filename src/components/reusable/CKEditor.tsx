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
        'bold', 'italic', 'strikethrough', 'code', '|',
        'bulletedList', 'numberedList', 'todoList', '|',
        'link', 'mediaEmbed', 'insertTable', 'blockQuote', '|',
        'removeFormat'
    ];

    const editorConfig = {
        placeholder: placeholder || 'Type your content here...',
        toolbar: config?.toolbar || defaultToolbar,
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
                "group relative rounded-md border border-input bg-background ring-offset-background w-full max-w-xl mx-auto",
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