import { Router } from 'express';
import { addCollaboration, deleteCollaboration } from '../controller/collaboration-controller.js';
import validate from '../../../middlewares/validate.js';
import authenticationToken from '../../../middlewares/auth.js';
import { collaborationPayloadSchema, collaborationDeletePayload } from '../validator/schema.js';

const router = Router();

router.post('/collaborations', authenticationToken, validate(collaborationPayloadSchema), addCollaboration);
router.delete('/collaborations', authenticationToken, validate(collaborationDeletePayload), deleteCollaboration);

export default router;