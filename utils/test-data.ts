export function randomEmail(prefix = 'qa'): string {
    const suffix = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    return `${prefix}.${suffix}@example.com`;
}

export function randomName(): string {
    const first = ['Alex', 'Jordan', 'Taylor', 'Sam', 'Casey'];
    const last = ['Rivera', 'Chen', 'Patel', 'Nguyen', 'Santos'];
    const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    return `${pick(first)} ${pick(last)}`;
}

export function randomJobTitle(): string {
    const titles = ['QA Engineer', 'SDET', 'Automation Engineer', 'Test Lead'];
    return titles[Math.floor(Math.random() * titles.length)];
}