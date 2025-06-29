import { NextRequest, NextResponse } from 'next/server';
import products from '@/data/products.json';
import { verifyToken } from '@/utils/auth';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const id = searchParams.get('id');

  if (id) {
    const product = products.find(p => p.id.toString() === id);
    if (!product) {
      return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
    }
    return NextResponse.json(product);
  }

  if (category && category !== 'all') {
    const filtered = products.filter(p => p.category === category);
    return NextResponse.json(filtered);
  }

  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  //const token = request.headers.get('authorization')?.split(' ')[1];
  const token = request.headers.get('authorization')?.split(' ')[1] ?? null;
  const { isValid, role } = verifyToken(token);


  if (!isValid || role !== 'admin') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.name || !body.price || !body.category || !body.description || !body.image) {
      return NextResponse.json({ error: 'Données incomplètes' }, { status: 400 });
    }

    const newProduct = {
      id: products.length + 1,
      ...body,
      featured: body.featured || false,
    };

    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
