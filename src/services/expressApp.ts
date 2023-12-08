import express, { Application } from 'express';
import path from 'path';


import { adminRoutes, shoppingRoutes, vendorRoutes, customerRoutes } from '../routes';


export default async (app:Application) => {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use('/images', express.static(path.join(__dirname, 'images')))
    
    
    app.use('/vendor', vendorRoutes);
    app.use('/admin', adminRoutes);
    app.use('/customer', customerRoutes);
    app.use(shoppingRoutes);


    return app;
}
 

