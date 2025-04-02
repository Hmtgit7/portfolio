// Minimal Node.js type declarations
declare namespace NodeJS {
    interface Process {
        env: {
            [key: string]: string | undefined;
        };
        exit(code?: number): never;
    }
}

declare var process: NodeJS.Process;