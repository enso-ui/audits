import { describe, expect, it, vi } from 'vitest';

vi.mock('@enso-ui/enums/src/pinia/enums', () => ({
    enums: () => ({
        enums: {
            auditEvent: {
                Updated: 1,
            },
        },
    }),
}));

import Diff from '../src/bulma/pages/audit/components/Diff.vue';

describe('Diff', () => {
    it('imports enum store without aliasing', () => {
        expect(Diff).toBeTruthy();
    });
});
