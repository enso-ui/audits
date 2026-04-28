import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@enso-ui/enums/src/pinia/enums', () => ({
    enums: () => ({
        enums: {
            auditEvent: {
                _filter: () => [{ label: 'Updated', value: 2 }],
                Updated: 2,
            },
        },
    }),
}));

import Diff from '../src/bulma/pages/audit/components/Diff.vue';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.resolve(currentDirectory, '../src/bulma/pages/audit/Index.vue');

describe('Diff', () => {
    it('imports enum store without aliasing', () => {
        expect(Diff).toBeTruthy();
    });
});

describe('Index', () => {
    it('includes action and model filters plus enum rendering', () => {
        const source = fs.readFileSync(indexPath, 'utf8');

        expect(source).toContain('filters.audits.event');
        expect(source).toContain('filters.audits.auditable_type');
        expect(source).toContain('<EnsoInputFilter class="box model"');
        expect(source).toContain('column.enum._get(row.event)');
    });
});
