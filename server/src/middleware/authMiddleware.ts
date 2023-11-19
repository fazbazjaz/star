import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // every time the client makes a request it will come with the customJWT
  // the authMiddleware will verify the customJWT against our JWT_SECRET

  // get the Authorization Header from the Request
  const authorizationHeader = req.header('Authorization');
  // console.log("authMiddleware authorizationHeader:", authorizationHeader);

  if (
    !authorizationHeader ||
    !authorizationHeader.startsWith('Bearer') ||
    authorizationHeader === 'Bearer null'
  ) {
    return res
      .status(401)
      .json({ error: 'Unauthorized - No Authorization Header Provided' });
  }

  // Get the customJWT from the Authorization Header
  const customJWT = authorizationHeader.split(' ')[1];
  // console.log("authMiddleware customJWT:", customJWT);

  if (!customJWT) {
    return res.status(401).json({ error: 'Unauthorized - No JWT Provided' });
  }

  // Verify the customJWT
  const verifyCustomJWT = jwt.verify(
    customJWT,
    process.env.JWT_SECRET as Secret
  );
  // console.log("authMiddleware verifyCustomJWT:", verifyCustomJWT);

  if (!verifyCustomJWT) {
    return res.status(401).json({ error: 'Unauthorized - Invalid JWT' });
  }

  const decodedCustomJWT = jwt.decode(customJWT);
  console.log('decodedCustomJWT:', decodedCustomJWT);

  // store the User Information from the Payload in a User Property on the Request Object
  // req.user = decodedCustomJWT;

  // all the checks have passed Authorize the Request
  next();
};
