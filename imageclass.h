// Copyright (c) 2012 Oliver Lau <ola@ct.de>, Heise Zeitschriften Verlag
// All rights reserved.

#ifndef __IMAGECLASS_H_
#define __IMAGECLASS_H_

#include <QImage>
#include <QtScript/QScriptClass>
#include <QtScript/QScriptString>
#include <QtScript/QScriptContext>
#include <QtScript/QScriptEngine>
#include <QtScript/QScriptable>


class ImageClass : public QObject, public QScriptClass
{
public:
    ImageClass(QScriptEngine* engine = NULL);
    ~ImageClass();

    QScriptValue constructor(void);
    QScriptValue newInstance(void);
    QScriptValue newInstance(const QImage&);
    QString name(void) const;
    QScriptValue prototype(void) const;

    static void Init(QScriptEngine* engine)
    {
        engine->globalObject().setProperty("Image", (new ImageClass(engine))->constructor());
    }

private:
    static QScriptValue construct(QScriptContext* ctx, QScriptEngine* eng);
    static QScriptValue toScriptValue(QScriptEngine* eng, const QImage&);
    static void fromScriptValue(const QScriptValue& obj, QImage&);

    QScriptValue mProto;
    QScriptValue mCtor;
};



class ImagePrototype : public QObject, public QScriptable
{
    Q_OBJECT
    Q_PROPERTY(int w READ width)
    Q_PROPERTY(int h READ height)

public:
    ImagePrototype(QObject* parent = NULL);
    ~ImagePrototype();

public slots:
    QSize size(void) const;
    int width(void) const;
    int height(void) const;

private:
    QImage* thisImage(void) const;
};


Q_DECLARE_METATYPE(QImage*)
Q_DECLARE_METATYPE(QImage)
Q_DECLARE_METATYPE(ImageClass*)


#endif // __IMAGECLASS_H_
